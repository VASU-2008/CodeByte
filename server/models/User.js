const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'coordinator'],
        required: true
    },

    // Patient-specific fields
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    bloodGroup: { type: String },
    allergies: [{ type: String }],
    chronicConditions: [{ type: String }],
    abhaId: { type: String },           // Ayushman Bharat Health Account ID
    languagePreference: { type: String, default: 'English' },

    // Doctor-specific fields
    specialization: { type: String },
    facility_id: { type: String, default: 'PHC_MAIN' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
