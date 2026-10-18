const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
    getProfile,
    getVisits,
    submitIntake,
    getQRToken,
    confirmFollowup,
    getMedicines
} = require('../controllers/patientController');

// All patient routes require patient role authentication
router.get('/profile', protect, authorize('patient'), getProfile);
router.get('/visits', protect, authorize('patient'), getVisits);
router.post('/intake', protect, authorize('patient'), submitIntake);
router.get('/qr-token', protect, authorize('patient'), getQRToken);
router.post('/followup/confirm', protect, authorize('patient'), confirmFollowup);
router.get('/medicines', protect, authorize('patient'), getMedicines);

module.exports = router;