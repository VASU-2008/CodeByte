const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Encounter = require('../models/Encounter');
const Vitals = require('../models/Vitals');
const Prescription = require('../models/Prescription');
const FollowUp = require('../models/FollowUp');
const Task = require('../models/Task');
const Alert = require('../models/Alert');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/veyora_healthcare';

async function seedDatabase() {
    try {
        console.log(`[Seed] Connecting to MongoDB: ${MONGO_URI}`);
        await mongoose.connect(MONGO_URI);
        console.log('[Seed] Connected successfully.');

        // Load dummy data JSON
        const rawData = fs.readFileSync(path.join(__dirname, 'dummyData.json'), 'utf-8');
        const data = JSON.parse(rawData);

        // 1. Clear existing collections
        console.log('[Seed] Clearing existing collections...');
        await Promise.all([
            User.deleteMany({}),
            Encounter.deleteMany({}),
            Vitals.deleteMany({}),
            Prescription.deleteMany({}),
            FollowUp.deleteMany({}),
            Task.deleteMany({}),
            Alert.deleteMany({})
        ]);

        // 2. Insert Users (hash passwords)
        console.log(`[Seed] Seeding ${data.users.length} users...`);
        const userMap = {}; // email -> User document
        for (const u of data.users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(u.password, salt);
            const userDoc = await User.create({
                ...u,
                password: hashedPassword
            });
            userMap[u.email] = userDoc;
        }

        const primaryDoctor = userMap['doctor@veyora.com'];

        // 3. Insert Encounters
        console.log(`[Seed] Seeding ${data.encounters.length} encounters...`);
        const encounterMap = {}; // token_id -> Encounter document
        for (const enc of data.encounters) {
            const patient = userMap[enc.patientEmail];
            if (!patient) continue;

            const encDoc = await Encounter.create({
                patient_id: patient._id,
                clinician_id: primaryDoctor._id,
                facility_id: enc.facility_id || 'PHC_MAIN',
                token_id: enc.token_id,
                chief_complaint: enc.chief_complaint,
                diagnosis: enc.diagnosis,
                clinical_findings: enc.clinical_findings,
                doctor_notes: enc.doctor_notes,
                lifestyle_advice: enc.lifestyle_advice,
                status: enc.status,
                priority: enc.priority,
                severity: enc.severity,
                triage_result: enc.triage_result,
                is_signed_off: enc.is_signed_off,
                signed_at: enc.is_signed_off ? new Date() : null
            });
            encounterMap[enc.token_id] = encDoc;
        }

        // 4. Insert Vitals
        console.log(`[Seed] Seeding vitals recordings...`);
        for (const v of data.vitals) {
            const enc = encounterMap[v.token_id];
            if (!enc) continue;

            await Vitals.create({
                encounter_id: enc._id,
                patient_id: enc.patient_id,
                recordedBy: primaryDoctor._id,
                bloodPressureSys: v.bloodPressureSys,
                bloodPressureDia: v.bloodPressureDia,
                heartRate: v.heartRate,
                temperature: v.temperature,
                spo2: v.spo2,
                respiratoryRate: v.respiratoryRate,
                weightKg: v.weightKg
            });
        }

        // 5. Insert Prescriptions
        console.log(`[Seed] Seeding prescriptions...`);
        for (const rx of data.prescriptions) {
            const enc = encounterMap[rx.token_id];
            if (!enc) continue;

            await Prescription.create({
                encounter_id: enc._id,
                patient_id: enc.patient_id,
                clinician_id: primaryDoctor._id,
                medications: rx.medications,
                notes: rx.notes
            });
        }

        // 6. Insert FollowUps
        console.log(`[Seed] Seeding follow-up records...`);
        for (const fu of data.followups) {
            const enc = encounterMap[fu.token_id];
            if (!enc) continue;

            await FollowUp.create({
                encounter_id: enc._id,
                patient_id: enc.patient_id,
                clinician_id: primaryDoctor._id,
                followupDate: new Date(fu.followupDate),
                reason: fu.reason,
                instructions: fu.instructions,
                status: fu.status
            });
        }

        // 7. Insert Tasks (Internal Follow-up & Welfare Action Log)
        console.log(`[Seed] Seeding ${data.tasks.length} care continuity tasks...`);
        for (const t of data.tasks) {
            await Task.create({
                ...t,
                assigned_to: primaryDoctor?._id
            });
        }

        // 8. Insert Alerts
        console.log(`[Seed] Seeding ${data.alerts.length} emergency alerts...`);
        for (const a of data.alerts) {
            await Alert.create({
                ...a,
                triggeredBy: primaryDoctor?._id
            });
        }

        console.log('\n=========================================');
        console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
        console.log('=========================================');
        console.log(`Users Created:         ${data.users.length}`);
        console.log(`Encounters Created:    ${data.encounters.length}`);
        console.log(`Vitals Created:        ${data.vitals.length}`);
        console.log(`Prescriptions Created: ${data.prescriptions.length}`);
        console.log(`Follow-ups Created:    ${data.followups.length}`);
        console.log(`Care Continuity Tasks: ${data.tasks.length}`);
        console.log(`Emergency Alerts:      ${data.alerts.length}`);
        console.log('\nDefault Test Accounts:');
        console.log('  👨‍⚕️ Doctor:  doctor@veyora.com  / password123');
        console.log('  🏥 Patient: patient@veyora.com / password123 (with Veyora AI Care Coordinator)');
        console.log('=========================================\n');

        process.exit(0);
    } catch (err) {
        console.error('\n❌ [Seed Error]:', err.message);
        if (err.message.includes('ECONNREFUSED')) {
            console.error('\n👉 Reason: No MongoDB service is currently running on localhost:27017.');
            console.error('👉 How to fix:');
            console.error('   Option 1: If local MongoDB is installed, start it with:');
            console.error('             net start MongoDB   (in Administrator PowerShell) or run: mongod');
            console.error('   Option 2: If using MongoDB Atlas (Free Cloud), add your connection string to server/.env:');
            console.error('             MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/veyora_healthcare\n');
        }
        process.exit(1);
    }
}

seedDatabase();
