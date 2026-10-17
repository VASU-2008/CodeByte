const Task = require('../models/Task');

/**
 * @route   GET /api/coordinator/tasks
 * @desc    Get the coordinator task queue (filterable by status and priority)
 * @access  Private (coordinator)
 */
const getTasks = async (req, res) => {
    try {
        const { status, priority } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        // Default: show non-resolved tasks
        if (!status) {
            filter.status = { $in: ['PENDING', 'IN_PROGRESS'] };
        }

        const tasks = await Task.find(filter)
            .populate('encounter_id', 'token_id chief_complaint status')
            .populate('patient_id', 'name phone')
            .populate('assigned_to', 'name')
            .sort({ priority: -1, createdAt: 1 });

        res.json(tasks);
    } catch (error) {
        console.error('[coordinatorController] getTasks error:', error.message);
        res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
};

/**
 * @route   POST /api/coordinator/tasks/:id/resolve
 * @desc    Mark a task as resolved
 * @access  Private (coordinator)
 */
const resolveTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.status === 'RESOLVED') {
            return res.status(400).json({ message: 'Task is already resolved' });
        }

        task.status = 'RESOLVED';
        task.resolvedBy = req.user.id;
        task.resolvedAt = new Date();
        task.resolution_notes = req.body.resolution_notes || '';
        await task.save();

        res.json({
            success: true,
            message: 'Task resolved successfully',
            task
        });
    } catch (error) {
        console.error('[coordinatorController] resolveTask error:', error.message);
        res.status(500).json({ message: 'Failed to resolve task' });
    }
};

/**
 * @route   POST /api/coordinator/tasks
 * @desc    Create a new task (e.g., from escalation or referral)
 * @access  Private (coordinator, doctor)
 */
const createTask = async (req, res) => {
    try {
        const { type, description, encounter_id, patient_id, assigned_to, priority } = req.body;

        if (!type || !description) {
            return res.status(400).json({ message: 'Task type and description are required' });
        }

        const task = await Task.create({
            type,
            description,
            encounter_id,
            patient_id,
            assigned_to,
            priority: priority || 'MEDIUM'
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        console.error('[coordinatorController] createTask error:', error.message);
        res.status(500).json({ message: 'Failed to create task' });
    }
};

module.exports = { getTasks, resolveTask, createTask };
