const express = require('express');
const router = express.Router();

router.get('/tasks', (req, res) => res.json({ message: 'Get coordinator task queue stub' }));
router.post('/tasks/:id/resolve', (req, res) => res.json({ message: 'Resolve task stub' }));

module.exports = router;