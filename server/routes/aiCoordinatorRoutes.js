const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
    getCareContext,
    chatWithAI,
    markDose
} = require('../controllers/aiCoordinatorController');

// All AI coordinator routes require patient authentication (doctors can also review if inspecting patient)
router.get('/context', protect, authorize('patient', 'doctor'), getCareContext);
router.post('/chat', protect, authorize('patient', 'doctor'), chatWithAI);
router.post('/mark-dose', protect, authorize('patient', 'doctor'), markDose);

module.exports = router;
