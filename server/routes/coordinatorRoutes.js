const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getTasks, resolveTask, createTask } = require('../controllers/coordinatorController');

router.get('/tasks', protect, authorize('coordinator'), getTasks);
router.post('/tasks', protect, authorize('coordinator', 'doctor'), createTask);
router.post('/tasks/:id/resolve', protect, authorize('coordinator'), resolveTask);

module.exports = router;