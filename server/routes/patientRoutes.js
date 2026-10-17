const express = require('express');
const router = express.Router();

router.get('/visits', (req, res) => res.json({ message: 'Get patient visits stub' }));
router.post('/intake', (req, res) => res.json({ message: 'Submit intake & generate token stub' }));

module.exports = router;