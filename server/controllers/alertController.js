const Alert = require('../models/Alert');
const Task = require('../models/Task');

/**
 * @route   POST /api/alerts/emergency-redflag
 * @desc    Trigger an emergency red-flag alert (creates alert + coordinator task)
 * @access  Private (any authenticated role)
 */
const triggerEmergency = async (req, res) => {
    try {
        const { message, encounter_id, patient_id, severity } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Alert message is required' });
        }

        // Create the alert
        const alert = await Alert.create({
            type: 'EMERGENCY',
            message,
            encounter_id: encounter_id || null,
            patient_id: patient_id || null,
            triggeredBy: req.user.id,
            severity: severity || 'CRITICAL'
        });

        // Auto-create a coordinator task for this emergency
        await Task.create({
            type: 'ESCALATION',
            description: `EMERGENCY ALERT: ${message}`,
            encounter_id: encounter_id || null,
            patient_id: patient_id || null,
            priority: 'CRITICAL',
            status: 'PENDING'
        });

        res.status(201).json({
            success: true,
            message: 'Emergency alert triggered and coordinator notified',
            alert
        });
    } catch (error) {
        console.error('[alertController] triggerEmergency error:', error.message);
        res.status(500).json({ message: 'Failed to trigger emergency alert' });
    }
};

/**
 * @route   GET /api/alerts
 * @desc    Get all active alerts
 * @access  Private (coordinator, doctor)
 */
const getAlerts = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};

        if (status) {
            filter.status = status;
        } else {
            filter.status = { $in: ['ACTIVE', 'ACKNOWLEDGED'] };
        }

        const alerts = await Alert.find(filter)
            .populate('encounter_id', 'token_id chief_complaint')
            .populate('patient_id', 'name phone')
            .populate('triggeredBy', 'name role')
            .sort({ createdAt: -1 });

        res.json(alerts);
    } catch (error) {
        console.error('[alertController] getAlerts error:', error.message);
        res.status(500).json({ message: 'Failed to retrieve alerts' });
    }
};

/**
 * @route   POST /api/alerts/:id/acknowledge
 * @desc    Acknowledge an alert
 * @access  Private (coordinator, doctor)
 */
const acknowledgeAlert = async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);
        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        alert.status = 'ACKNOWLEDGED';
        alert.acknowledgedBy = req.user.id;
        alert.acknowledgedAt = new Date();
        await alert.save();

        res.json({
            success: true,
            message: 'Alert acknowledged',
            alert
        });
    } catch (error) {
        console.error('[alertController] acknowledgeAlert error:', error.message);
        res.status(500).json({ message: 'Failed to acknowledge alert' });
    }
};

module.exports = { triggerEmergency, getAlerts, acknowledgeAlert };
