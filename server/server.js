const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Modular API Endpoints
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/patient', require('./routes/patientRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));
app.use('/api/coordinator', require('./routes/coordinatorRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Veyora Backend' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`[Server] Running on port ${PORT}`));