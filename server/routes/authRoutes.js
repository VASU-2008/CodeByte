const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => res.json({ message: 'Auth login stub' }));
router.post('/register', (req, res) => res.json({ message: 'Auth register stub' }));

module.exports = router;