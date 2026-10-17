const { v4: uuidv4 } = require('uuid');
const Encounter = require('../models/Encounter');
const Vitals = require('../models/Vitals');
const Prescription = require('../models/Prescription');
const FollowUp = require('../models/FollowUp');

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
                vitals: vitals || null,
                prescriptions,
                followups
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
 * @desc    Submit patient intake form and generate a queue token
 * @access  Private (patient)
 */
const submitIntake = async (req, res) => {
    try {
        const { chief_complaint, facility_id } = req.body;

        if (!chief_complaint || chief_complaint.trim().length === 0) {
            return res.status(400).json({ message: 'Chief complaint is required' });
        }

        // Generate a unique token ID for queue tracking
        const token_id = 'TKN-' + uuidv4().substring(0, 8).toUpperCase();

        const encounter = await Encounter.create({
            patient_id: req.user.id,
            chief_complaint: chief_complaint.trim(),
            facility_id: facility_id || 'PHC_MAIN',
            token_id,
            status: 'IN_QUEUE'
        });

        res.status(201).json({
            message: 'Intake submitted successfully. You are now in the queue.',
            encounter: {
                _id: encounter._id,
                token_id: encounter.token_id,
                chief_complaint: encounter.chief_complaint,
                status: encounter.status,
                facility_id: encounter.facility_id,
                createdAt: encounter.createdAt
            }
        });
    } catch (error) {
        console.error('[patientController] submitIntake error:', error.message);
        res.status(500).json({ message: 'Failed to submit intake' });
    }
};

module.exports = { getVisits, submitIntake };
