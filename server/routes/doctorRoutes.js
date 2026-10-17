const express = require('express');
const router = express.Router();

router.get('/queue', (req, res) => res.json({ message: 'Get doctor queue stub' }));
router.post('/sign-off', (req, res) => res.json({ message: 'Doctor sign-off stub' }));

module.exports = router;