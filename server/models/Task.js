const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['REFERRAL', 'FOLLOW_UP_REMINDER', 'ESCALATION', 'SUPPLY_REQUEST', 'GENERAL'],
        required: true
    },
    description: { type: String, required: true },
    encounter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Encounter' },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'MEDIUM'
    },
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CANCELLED'],
        default: 'PENDING'
    },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: { type: Date },
    resolution_notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
