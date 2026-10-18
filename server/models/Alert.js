const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['EMERGENCY', 'RED_FLAG', 'WARNING', 'INFO'],
        required: true
    },
    message: { type: String, required: true },
    encounter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Encounter' },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    triggeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    severity: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'HIGH'
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'],
        default: 'ACTIVE'
    },
    acknowledgedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    acknowledgedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Alert', AlertSchema);
