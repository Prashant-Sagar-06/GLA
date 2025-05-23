const express = require('express');
const router = express.Router();
const CulturalClub = require('../models/CulturalClub');

// Get all cultural clubs
router.get('/cultural-clubs', async (req, res) => {
  try {
    const clubs = await CulturalClub.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cultural clubs" });
  }
});

module.exports = router;