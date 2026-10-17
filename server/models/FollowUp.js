const mongoose = require('mongoose');

const FollowUpSchema = new mongoose.Schema({
    encounter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Encounter', required: true },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clinician_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followupDate: { type: Date, required: true },
    reason: { type: String },
    instructions: { type: String },
    status: {
        type: String,
        enum: ['SCHEDULED', 'COMPLETED', 'MISSED', 'CANCELLED'],
        default: 'SCHEDULED'
    }
}, { timestamps: true });

module.exports = mongoose.model('FollowUp', FollowUpSchema);
