const mongoose = require('mongoose');

const VitalsSchema = new mongoose.Schema({
    encounter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Encounter', required: true },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bloodPressureSys: { type: Number },
    bloodPressureDia: { type: Number },
    heartRate: { type: Number },
    temperature: { type: Number },
    spo2: { type: Number },
    respiratoryRate: { type: Number },
    weightKg: { type: Number },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recordedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Vitals', VitalsSchema);
