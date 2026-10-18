const http = require('http');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const cron = require('node-cron');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    socket.on('join_portal', (role) => {
        socket.join(role);
        console.log(`[Socket.io] Client ${socket.id} joined channel: ${role}`);
    });

    socket.on('disconnect', () => {
        console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
});

// Middleware
app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
}));
app.use(express.json());

// Attach io to req for controllers to trigger real-time broadcasts
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Modular API Endpoints
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/patient', require('./routes/patientRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));
app.use('/api/ai-coordinator', require('./routes/aiCoordinatorRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Veyora Healthcare Backend', timestamp: new Date() }));

// Scheduled Automation Daemon (Simulates VeyoraAI follow-up tracking & adherence telemetry)
cron.schedule('0 * * * *', async () => {
    try {
        console.log('[Automation Daemon] Running hourly care continuity scan...');
        // Scan for overdue followups and generate coordinator alerts
        const FollowUp = require('./models/FollowUp');
        const Task = require('./models/Task');

        const overdue = await FollowUp.find({
            followupDate: { $lt: new Date() },
            status: 'SCHEDULED'
        }).populate('patient_id', 'name phone');

        for (const item of overdue) {
            item.status = 'MISSED';
            await item.save();

            // Auto-create escalation task
            await Task.create({
                type: 'FOLLOW_UP_REMINDER',
                category: 'reminder',
                title: `Overdue Follow-up: ${item.patient_id?.name || 'Patient'}`,
                description: `Patient missed scheduled clinical visit. Reason: ${item.reason || 'General Follow-up'}. Immediate outreach required.`,
                patient_id: item.patient_id?._id,
                patientName: item.patient_id?.name,
                patientPhone: item.patient_id?.phone,
                priority: 'HIGH',
                status: 'Active',
                actionRequired: 'Initiate coordinator phone call or dispatch ASHA worker for welfare check.'
            });
        }
    } catch (err) {
        console.error('[Automation Daemon] Error in scan:', err.message);
    }
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`[Server] Running with Socket.io on port ${PORT}`));

module.exports = { app, server, io };