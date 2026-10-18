const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { triggerEmergency, getAlerts, acknowledgeAlert } = require('../controllers/alertController');

router.post('/emergency-redflag', protect, triggerEmergency);
router.get('/', protect, authorize('coordinator', 'doctor'), getAlerts);
router.post('/:id/acknowledge', protect, authorize('coordinator', 'doctor'), acknowledgeAlert);

module.exports = router;