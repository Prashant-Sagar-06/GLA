const express = require('express');
const router = express.Router();
const CouncilMember = require('../models/CouncilMember');

router.get('/', async (req, res) => {
  try {
    const members = await CouncilMember.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch council members' });
  }
});

module.exports = router;