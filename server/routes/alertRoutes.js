const express = require('express');
const router = express.Router();

router.post('/emergency-redflag', (req, res) => res.json({ message: 'Emergency 112 event triggered stub' }));

module.exports = router;