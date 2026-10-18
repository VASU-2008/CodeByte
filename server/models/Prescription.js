const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },       // e.g. "500mg"
    frequency: { type: String, required: true },     // e.g. "1-0-1"
    duration: { type: String },                      // e.g. "7 days"
    instructions: { type: String }                   // e.g. "After meals"
}, { _id: false });

const PrescriptionSchema = new mongoose.Schema({
    encounter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Encounter', required: true },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clinician_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medications: [MedicationSchema],
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', PrescriptionSchema);
