const Encounter = require('../models/Encounter');
const User = require('../models/User');
const Vitals = require('../models/Vitals');
const Prescription = require('../models/Prescription');
const FollowUp = require('../models/FollowUp');

/**
 * @route   GET /api/doctor/queue
 * @desc    Retrieve the doctor's patient queue at a facility
 * @access  Private (doctor)
 */
const getDoctorQueue = async (req, res) => {
    try {
        const facilityId = req.query.facilityId || 'PHC_MAIN';

        const encounters = await Encounter.find({
            facility_id: facilityId,
            status: { $in: ['IN_QUEUE', 'IN_CONSULTATION', 'AWAITING_SIGN_OFF'] }
        })
            .populate('patient_id', 'name age gender phone')
            .sort({ createdAt: 1 });

        res.json(encounters);
    } catch (error) {
        console.error('[doctorController] getDoctorQueue error:', error.message);
        res.status(500).json({ message: 'Failed to retrieve queue' });
    }
};

/**
 * @route   GET /api/doctor/token/:tokenId
 * @desc    Look up an encounter by its QR token ID
 * @access  Private (doctor)
 */
const lookupByToken = async (req, res) => {
    try {
        const { tokenId } = req.params;

        const encounter = await Encounter.findOne({ token_id: tokenId })
            .populate('patient_id', 'name age gender phone bloodGroup allergies chronicConditions abhaId languagePreference');

        if (!encounter) {
            return res.status(404).json({ message: `No encounter found for token: ${tokenId}` });
        }

        res.json(encounter);
    } catch (error) {
        console.error('[doctorController] lookupByToken error:', error.message);
        res.status(500).json({ message: 'Failed to look up token' });
    }
};

/**
 * @route   GET /api/doctor/encounter/:id/briefing
 * @desc    Clinical briefing — patient info, current encounter, vitals, past visits
 * @access  Private (doctor)
 */
const getClinicalBriefing = async (req, res) => {
    try {
        const encounter = await Encounter.findById(req.params.id)
            .populate('patient_id', 'name age gender phone bloodGroup allergies chronicConditions abhaId languagePreference');

        if (!encounter) {
            return res.status(404).json({ message: 'Encounter not found' });
        }

        // Fetch latest vitals for this encounter
        const vitals = await Vitals.findOne({ encounter_id: encounter._id })
            .sort({ recordedAt: -1 });

        // Fetch past visits for the same patient (excluding current)
        const pastEncounters = await Encounter.find({
            patient_id: encounter.patient_id._id,
            _id: { $ne: encounter._id },
            status: 'COMPLETED'
        })
            .populate('clinician_id', 'name')
            .sort({ createdAt: -1 })
            .limit(10);

        // For each past encounter, grab prescriptions to show what was prescribed
        const pastVisits = await Promise.all(pastEncounters.map(async (pastEnc) => {
            const prescriptions = await Prescription.find({ encounter_id: pastEnc._id });
            const medications = prescriptions.flatMap(p =>
                p.medications.map(m => `${m.name} ${m.dosage} (${m.frequency})`)
            );
            return {
                encounterId: pastEnc._id,
                date: pastEnc.createdAt,
                facility: pastEnc.facility_id,
                diagnosis: pastEnc.chief_complaint,
                prescribedBy: pastEnc.clinician_id?.name || 'Unknown',
                medicines: medications
            };
        }));

        res.json({
            encounterId: encounter._id,
            patient: encounter.patient_id,
            currentEncounter: {
                chief_complaint: encounter.chief_complaint,
                triage_result: encounter.triage_result,
                token_id: encounter.token_id
            },
            vitals: vitals || null,
            pastVisits
        });
    } catch (error) {
        console.error('[doctorController] getClinicalBriefing error:', error.message);
        res.status(500).json({ message: 'Failed to retrieve clinical briefing' });
    }
};

/**
 * @route   POST /api/doctor/encounter/:id/notes
 * @desc    Save consultation notes and clinical findings
 * @access  Private (doctor)
 */
const saveConsultationNotes = async (req, res) => {
    try {
        const encounter = await Encounter.findById(req.params.id);
        if (!encounter) {
            return res.status(404).json({ message: 'Encounter not found' });
        }

        // Update encounter with notes data and move status to IN_CONSULTATION
        encounter.chief_complaint = req.body.diagnosis || encounter.chief_complaint;
        encounter.triage_result = req.body.triage_result || encounter.triage_result;
        encounter.clinician_id = req.user.id;
        if (encounter.status === 'IN_QUEUE') {
            encounter.status = 'IN_CONSULTATION';
        }
        await encounter.save();

        res.json({
            success: true,
            message: 'Consultation notes recorded successfully',
            encounterId: encounter._id,
            savedAt: new Date().toISOString(),
            ...req.body
        });
    } catch (error) {
        console.error('[doctorController] saveConsultationNotes error:', error.message);
        res.status(500).json({ message: 'Failed to save consultation notes' });
    }
};

/**
 * @route   POST /api/doctor/encounter/:id/vitals
 * @desc    Record patient vitals for an encounter
 * @access  Private (doctor)
 */
const saveVitals = async (req, res) => {
    try {
        const encounter = await Encounter.findById(req.params.id);
        if (!encounter) {
            return res.status(404).json({ message: 'Encounter not found' });
        }

        const vitals = await Vitals.create({
            encounter_id: encounter._id,
            patient_id: encounter.patient_id,
            recordedBy: req.user.id,
            bloodPressureSys: req.body.bloodPressureSys,
            bloodPressureDia: req.body.bloodPressureDia,
            heartRate: req.body.heartRate,
            temperature: req.body.temperature,
            spo2: req.body.spo2,
            respiratoryRate: req.body.respiratoryRate,
            weightKg: req.body.weightKg
        });

        res.json({
            success: true,
            message: 'Vitals recorded successfully',
            encounterId: encounter._id,
            vitals,
            savedAt: vitals.recordedAt.toISOString()
        });
    } catch (error) {
        console.error('[doctorController] saveVitals error:', error.message);
        res.status(500).json({ message: 'Failed to save vitals' });
    }
};

/**
 * @route   POST /api/doctor/encounter/:id/prescription
 * @desc    Create a multi-drug prescription
 * @access  Private (doctor)
 */
const createPrescription = async (req, res) => {
    try {
        const encounter = await Encounter.findById(req.params.id);
        if (!encounter) {
            return res.status(404).json({ message: 'Encounter not found' });
        }

        const { medications, notes } = req.body;

        if (!medications || !Array.isArray(medications) || medications.length === 0) {
            return res.status(400).json({ message: 'At least one medication is required' });
        }

        const prescription = await Prescription.create({
            encounter_id: encounter._id,
            patient_id: encounter.patient_id,
            clinician_id: req.user.id,
            medications,
            notes
        });

        res.json({
            success: true,
            message: 'Prescription recorded successfully',
            encounterId: encounter._id,
            prescriptionId: prescription._id,
            medications: prescription.medications,
            createdAt: prescription.createdAt.toISOString()
        });
    } catch (error) {
        console.error('[doctorController] createPrescription error:', error.message);
        res.status(500).json({ message: 'Failed to create prescription' });
    }
};

/**
 * @route   POST /api/doctor/encounter/:id/followup
 * @desc    Record follow-up schedule and instructions
 * @access  Private (doctor)
 */
const recordFollowup = async (req, res) => {
    try {
        const encounter = await Encounter.findById(req.params.id);
        if (!encounter) {
            return res.status(404).json({ message: 'Encounter not found' });
        }

        const { followupDate, reason, instructions } = req.body;

        if (!followupDate) {
            return res.status(400).json({ message: 'Follow-up date is required' });
        }

        const followup = await FollowUp.create({
            encounter_id: encounter._id,
            patient_id: encounter.patient_id,
            clinician_id: req.user.id,
            followupDate: new Date(followupDate),
            reason,
            instructions
        });

        // Mark the encounter for follow-up
        encounter.status = 'FOLLOW_UP_DUE';
        await encounter.save();

        res.json({
            success: true,
            message: 'Follow-up plan scheduled',
            encounterId: encounter._id,
            followupPlanId: followup._id,
            followupDate: followup.followupDate,
            reason: followup.reason,
            instructions: followup.instructions,
            createdAt: followup.createdAt.toISOString()
        });
    } catch (error) {
        console.error('[doctorController] recordFollowup error:', error.message);
        res.status(500).json({ message: 'Failed to record follow-up' });
    }
};

/**
 * @route   POST /api/doctor/encounter/:id/sign-off
 * @desc    Digitally sign off and lock a completed encounter
 * @access  Private (doctor)
 */
const signOff = async (req, res) => {
    try {
        const encounter = await Encounter.findById(req.params.id);
        if (!encounter) {
            return res.status(404).json({ message: 'Encounter not found' });
        }

        if (encounter.is_signed_off) {
            return res.status(400).json({ message: 'Encounter has already been signed off' });
        }

        encounter.is_signed_off = true;
        encounter.signed_at = new Date();
        encounter.clinician_id = req.user.id;
        encounter.status = 'COMPLETED';
        await encounter.save();

        res.json({
            success: true,
            message: 'Encounter successfully locked and signed off',
            encounterId: encounter._id,
            is_signed_off: true,
            signed_at: encounter.signed_at.toISOString(),
            clinician_id: req.user.id
        });
    } catch (error) {
        console.error('[doctorController] signOff error:', error.message);
        res.status(500).json({ message: 'Failed to sign off encounter' });
    }
};

module.exports = {
    getDoctorQueue,
    lookupByToken,
    getClinicalBriefing,
    saveConsultationNotes,
    saveVitals,
    createPrescription,
    recordFollowup,
    signOff
};
