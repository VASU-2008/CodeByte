const Task = require('../models/Task');

/**
 * @route   GET /api/coordinator/tasks
 * @desc    Get the coordinator task queue (filterable by status, category, priority, search)
 * @access  Private (coordinator)
 */
const getTasks = async (req, res) => {
    try {
        const { status, priority, category, search } = req.query;
        const filter = {};

        if (status && status !== 'ALL') {
            if (status === 'ACTIVE') {
                filter.status = { $in: ['PENDING', 'IN_PROGRESS', 'Active', 'Pending Dispatch', 'Vehicle Dispatched', 'Open'] };
            } else if (status === 'RESOLVED') {
                filter.status = { $in: ['RESOLVED', 'Resolved', 'Arrived at Facility'] };
            } else {
                filter.status = status;
            }
        }

        if (priority && priority !== 'ALL') {
            filter.priority = { $regex: new RegExp(`^${priority}$`, 'i') };
        }

        if (category && category !== 'ALL') {
            filter.category = category.toLowerCase();
        }

        if (search) {
            filter.$or = [
                { patientName: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { title: { $regex: search, $options: 'i' } },
                { assignedAsha: { $regex: search, $options: 'i' } },
                { village: { $regex: search, $options: 'i' } }
            ];
        }

        const tasks = await Task.find(filter)
            .populate('encounter_id', 'token_id chief_complaint status diagnosis')
            .populate('patient_id', 'name phone age gender')
            .populate('assigned_to', 'name')
            .sort({ priority: -1, createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        console.error('[coordinatorController] getTasks error:', error.message);
        res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
};

/**
 * @route   GET /api/coordinator/stats
 * @desc    Get counts and metrics for operations dashboard
 * @access  Private (coordinator)
 */
const getOperationsStats = async (req, res) => {
    try {
        const [activeCount, resolvedCount, transportCount, medicationCount] = await Promise.all([
            Task.countDocuments({ status: { $in: ['Active', 'PENDING', 'IN_PROGRESS', 'Pending Dispatch', 'Open'] } }),
            Task.countDocuments({ status: { $in: ['Resolved', 'RESOLVED', 'Arrived at Facility'] } }),
            Task.countDocuments({ category: 'transport', status: { $in: ['Active', 'PENDING', 'Pending Dispatch'] } }),
            Task.countDocuments({ category: 'medication', status: { $in: ['Active', 'PENDING', 'High Risk'] } })
        ]);

        res.json({
            activeCount,
            resolvedCount,
            transportCount,
            medicationCount
        });
    } catch (error) {
        console.error('[coordinatorController] getOperationsStats error:', error.message);
        res.status(500).json({ message: 'Failed to retrieve operations stats' });
    }
};

/**
 * @route   POST /api/coordinator/tasks
 * @desc    Create a new task (e.g. from escalation, transport, or referral)
 * @access  Private (coordinator, doctor)
 */
const createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            priority: req.body.priority || 'MEDIUM',
            status: req.body.status || 'Active'
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

/**
 * @route   PATCH /api/coordinator/tasks/:id
 * @desc    Update task details (driver dispatch, notes, status)
 * @access  Private (coordinator)
 */
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({
            success: true,
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        console.error('[coordinatorController] updateTask error:', error.message);
        res.status(500).json({ message: 'Failed to update task' });
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

        task.status = 'Resolved';
        task.resolvedBy = req.user.id;
        task.resolvedAt = new Date();
        task.resolution_notes = req.body.resolution_notes || req.body.resolutionNote || 'Action logged and resolved by Care Coordinator.';
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
 * @route   POST /api/coordinator/tasks/:id/reopen
 * @desc    Reopen a resolved task
 * @access  Private (coordinator)
 */
const reopenTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = 'Active';
        task.resolvedBy = null;
        task.resolvedAt = null;
        task.resolution_notes = '';
        await task.save();

        res.json({
            success: true,
            message: 'Task reopened successfully',
            task
        });
    } catch (error) {
        console.error('[coordinatorController] reopenTask error:', error.message);
        res.status(500).json({ message: 'Failed to reopen task' });
    }
};

module.exports = {
    getTasks,
    getOperationsStats,
    createTask,
    updateTask,
    resolveTask,
    reopenTask
};
