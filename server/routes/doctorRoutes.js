const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
    getDoctorQueue,
    lookupByToken,
    getClinicalBriefing,
    saveConsultationNotes,
    saveVitals,
    createPrescription,
    recordFollowup,
    signOff
} = require('../controllers/doctorController');

// All routes require doctor authentication
router.use(protect, authorize('doctor'));

router.get('/queue', getDoctorQueue);
router.get('/token/:tokenId', lookupByToken);
router.get('/encounter/:id/briefing', getClinicalBriefing);
router.post('/encounter/:id/notes', saveConsultationNotes);
router.post('/encounter/:id/vitals', saveVitals);
router.post('/encounter/:id/prescription', createPrescription);
router.post('/encounter/:id/followup', recordFollowup);
router.post('/encounter/:id/sign-off', signOff);

module.exports = router;