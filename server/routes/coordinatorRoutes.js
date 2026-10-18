const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
    getTasks,
    getOperationsStats,
    createTask,
    updateTask,
    resolveTask,
    reopenTask
} = require('../controllers/coordinatorController');

// All routes require coordinator or doctor authorization
router.get('/tasks', protect, authorize('coordinator', 'doctor'), getTasks);
router.get('/stats', protect, authorize('coordinator', 'doctor'), getOperationsStats);
router.post('/tasks', protect, authorize('coordinator', 'doctor'), createTask);
router.patch('/tasks/:id', protect, authorize('coordinator', 'doctor'), updateTask);
router.post('/tasks/:id/resolve', protect, authorize('coordinator'), resolveTask);
router.post('/tasks/:id/reopen', protect, authorize('coordinator'), reopenTask);

module.exports = router;