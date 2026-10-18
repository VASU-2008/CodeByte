const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['TRANSPORT', 'MEDICATION', 'REMINDER', 'VITALS', 'REFERRAL', 'FOLLOW_UP_REMINDER', 'ESCALATION', 'SUPPLY_REQUEST', 'GENERAL'],
        default: 'GENERAL'
    },
    category: {
        type: String,
        enum: ['transport', 'medication', 'reminder', 'vitals', 'general'],
        default: 'general'
    },
    title: { type: String },
    description: { type: String, required: true },
    actionRequired: { type: String },
    patientName: { type: String },
    patientAge: { type: Number },
    patientGender: { type: String },
    patientPhone: { type: String },
    abhaId: { type: String },
    tokenNumber: { type: String },
    village: { type: String },
    assignedAsha: { type: String },
    ashaPhone: { type: String },
    ashaSector: { type: String },
    voucherNumber: { type: String },
    driverAssigned: { type: String },
    driverPhone: { type: String },
    vehicleNumber: { type: String },
    dispatchedAt: { type: String },
    drug: { type: String },
    missedCount: { type: Number, default: 0 },
    lastTaken: { type: String },
    encounter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Encounter' },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'Low', 'Medium', 'High', 'Critical'],
        default: 'MEDIUM'
    },
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CANCELLED', 'Active', 'Resolved', 'Pending Dispatch', 'Vehicle Dispatched', 'Arrived at Facility', 'Open'],
        default: 'Active'
    },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: { type: Date },
    resolution_notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
