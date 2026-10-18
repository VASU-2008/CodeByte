const { v4: uuidv4 } = require('uuid');
const Encounter = require('../models/Encounter');
const Vitals = require('../models/Vitals');
const Prescription = require('../models/Prescription');
const FollowUp = require('../models/FollowUp');
const User = require('../models/User');

/**
 * Intelligent Symptom Triage Classifier
 */
function classifyTriage(complaint = '', severity = 3) {
    const text = complaint.toLowerCase();
    const emergencyKeywords = [
        'chest pain', 'heart attack', 'stroke', 'unconscious', 'seizure',
        'paralysis', 'severe bleeding', 'cannot breathe', 'difficulty breathing', 'cyanosis'
    ];

    if (emergencyKeywords.some(k => text.includes(k)) || severity >= 9) {
        return {
            destination: 'EMERGENCY',
            reason: 'High-acuity red flag symptoms detected. Immediate emergency medical response required. Call 112 or visit nearest emergency trauma centre.'
        };
    }
    if (severity >= 7 || text.includes('high fever') || text.includes('vomiting') || text.includes('dehydration')) {
        return {
            destination: 'CHC',
            reason: 'Moderate-to-high severity acute symptoms. Recommended for Community Health Centre with secondary diagnostic and observation facilities.'
        };
    }
    if (severity >= 4 || text.includes('fever') || text.includes('cough') || text.includes('headache') || text.includes('body ache') || text.includes('pain')) {
        return {
            destination: 'PHC',
            reason: 'Primary clinical symptoms manageable at Primary Health Centre outpatient consultation.'
        };
    }
    return {
        destination: 'OPD',
        reason: 'Mild non-urgent condition. General OPD routine consultation recommended.'
    };
}

/**
 * @route   GET /api/patient/profile
 * @desc    Fetch profile for the authenticated patient
 * @access  Private (patient)
 */
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('[patientController] getProfile error:', error.message);
        res.status(500).json({ message: 'Failed to retrieve profile' });
    }
};

/**
 * @route   GET /api/patient/visits
 * @desc    Get all encounters/visits for the logged-in patient
 * @access  Private (patient)
 */
const getVisits = async (req, res) => {
    try {
        const encounters = await Encounter.find({ patient_id: req.user.id })
            .populate('clinician_id', 'name specialization')
            .sort({ createdAt: -1 });

        // Enrich each encounter with vitals, prescriptions, and follow-ups
        const enrichedVisits = await Promise.all(encounters.map(async (enc) => {
            const encObj = enc.toObject();

            const [vitals, prescriptions, followups] = await Promise.all([
                Vitals.findOne({ encounter_id: enc._id }).sort({ recordedAt: -1 }),
                Prescription.find({ encounter_id: enc._id }),
                FollowUp.find({ encounter_id: enc._id })
            ]);

            return {
                ...encObj,
                clinician: enc.clinician_id ? { name: enc.clinician_id.name, specialization: enc.clinician_id.specialization } : null,
                vitals: vitals || null,
                prescriptions: prescriptions.flatMap(p => p.medications || []),
                prescriptionList: prescriptions,
                followups,
                followup: followups[0] ? {
                    recommended_date: followups[0].followupDate,
                    instructions: followups[0].instructions,
                    confirmed: followups[0].status === 'COMPLETED' || followups[0].status === 'SCHEDULED'
                } : null,
                clinical_summary: enc.clinical_findings || enc.doctor_notes || 'Consultation completed.',
                doctor_notes: enc.doctor_notes || enc.lifestyle_advice || ''
            };
        }));

        res.json(enrichedVisits);
    } catch (error) {
        console.error('[patientController] getVisits error:', error.message);
        res.status(500).json({ message: 'Failed to retrieve visits' });
    }
};

/**
 * @route   POST /api/patient/intake
 * @desc    Submit patient intake form and generate triage result + queue token
 * @access  Private (patient)
 */
const submitIntake = async (req, res) => {
    try {
        const { chief_complaint, severity = 3, duration = '2-3days', facility_id, notes } = req.body;

        if (!chief_complaint || chief_complaint.trim().length === 0) {
            return res.status(400).json({ message: 'Chief complaint is required' });
        }

        const triage = classifyTriage(chief_complaint, parseInt(severity, 10));
        const token_id = 'TOK-' + uuidv4().substring(0, 8).toUpperCase();

        const encounter = await Encounter.create({
            patient_id: req.user.id,
            chief_complaint: chief_complaint.trim(),
            facility_id: facility_id || 'PHC_MAIN',
            token_id,
            triage_result: triage.destination,
            severity: parseInt(severity, 10),
            doctor_notes: notes || '',
            status: 'IN_QUEUE'
        });

        res.status(201).json({
            message: 'Intake submitted successfully. You are now in the queue.',
            encounter_id: encounter._id,
            triage_result: triage.destination,
            destination: triage.destination,
            reason: triage.reason,
            token_id: encounter.token_id,
            encounter: {
                _id: encounter._id,
                token_id: encounter.token_id,
                chief_complaint: encounter.chief_complaint,
                status: encounter.status,
                facility_id: encounter.facility_id,
                triage_result: encounter.triage_result,
                createdAt: encounter.createdAt
            }
        });
    } catch (error) {
        console.error('[patientController] submitIntake error:', error.message);
        res.status(500).json({ message: 'Failed to submit intake' });
    }
};

/**
 * @route   GET /api/patient/qr-token
 * @desc    Get or refresh consent QR token for the patient's active encounter
 * @access  Private (patient)
 */
const getQRToken = async (req, res) => {
    try {
        let encounter = await Encounter.findOne({
            patient_id: req.user.id,
            status: { $in: ['IN_QUEUE', 'IN_CONSULTATION', 'AWAITING_SIGN_OFF', 'FOLLOW_UP_DUE'] }
        }).sort({ createdAt: -1 });

        if (!encounter) {
            encounter = await Encounter.findOne({ patient_id: req.user.id }).sort({ createdAt: -1 });
        }

        const token = encounter?.token_id || ('VY-TOK-' + uuidv4().substring(0, 8).toUpperCase());
        const expires_at = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString();

        res.json({
            token,
            encounter_id: encounter ? encounter._id : null,
            expires_at,
            status: 'active',
            consent_url: `https://veyora.health/consent/${token}`
        });
    } catch (error) {
        console.error('[patientController] getQRToken error:', error.message);
        res.status(500).json({ message: 'Failed to retrieve QR token' });
    }
};

/**
 * @route   POST /api/patient/followup/confirm
 * @desc    Confirm follow-up attendance
 * @access  Private (patient)
 */
const confirmFollowup = async (req, res) => {
    try {
        const { encounter_id } = req.body;
        const followup = await FollowUp.findOne({
            $or: [{ encounter_id }, { patient_id: req.user.id }]
        }).sort({ createdAt: -1 });

        if (followup) {
            followup.status = 'COMPLETED';
            await followup.save();
        }

        res.json({
            success: true,
            confirmed_at: new Date().toISOString(),
            message: 'Follow-up appointment attendance acknowledged and recorded.'
        });
    } catch (error) {
        console.error('[patientController] confirmFollowup error:', error.message);
        res.status(500).json({ message: 'Failed to confirm follow-up' });
    }
};

/**
 * @route   GET /api/patient/medicines
 * @desc    Get active medications and reminders for the patient
 * @access  Private (patient)
 */
const getMedicines = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patient_id: req.user.id })
            .populate('encounter_id', 'token_id createdAt')
            .populate('clinician_id', 'name')
            .sort({ createdAt: -1 });

        const medicines = [];
        prescriptions.forEach(p => {
            (p.medications || []).forEach(med => {
                medicines.push({
                    name: med.name,
                    dosage: med.dosage,
                    frequency: med.frequency,
                    duration: med.duration,
                    instructions: med.instructions,
                    prescribedBy: p.clinician_id?.name || 'Doctor',
                    date: p.createdAt,
                    encounterId: p.encounter_id?._id || p.encounter_id
                });
            });
        });

        res.json(medicines);
    } catch (error) {
        console.error('[patientController] getMedicines error:', error.message);
        res.status(500).json({ message: 'Failed to retrieve medicines' });
    }
};

module.exports = {
    getProfile,
    getVisits,
    submitIntake,
    getQRToken,
    confirmFollowup,
    getMedicines
};
