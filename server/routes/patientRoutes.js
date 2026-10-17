const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getVisits, submitIntake } = require('../controllers/patientController');

router.get('/visits', protect, authorize('patient'), getVisits);
router.post('/intake', protect, authorize('patient'), submitIntake);

module.exports = router;