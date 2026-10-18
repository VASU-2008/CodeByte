const mongoose = require('mongoose');

const EncounterSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parent_encounter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Encounter', default: null }, // Follow-up link
    facility_id: { type: String, default: 'PHC_MAIN' },
    clinician_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: {
        type: String,
        enum: ['SCHEDULED', 'IN_QUEUE', 'IN_CONSULTATION', 'AWAITING_SIGN_OFF', 'COMPLETED', 'FOLLOW_UP_DUE', 'ESCALATED'],
        default: 'IN_QUEUE'
    },
    chief_complaint: { type: String, required: true },
    diagnosis: { type: String },
    clinical_findings: { type: String },
    doctor_notes: { type: String },
    lifestyle_advice: { type: String },
    severity: { type: Number, default: 3 },
    priority: { type: String, enum: ['Routine', 'Moderate', 'High', 'Critical'], default: 'Routine' },
    triage_result: { type: String }, // PHC, CHC, OPD, EMERGENCY, teleconsult
    token_id: { type: String, unique: true, sparse: true },
    is_signed_off: { type: Boolean, default: false },
    signed_at: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Encounter', EncounterSchema);