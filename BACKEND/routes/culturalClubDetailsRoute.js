const express = require('express');
const router = express.Router();
const CulturalClubDetail = require('../models/CulturalClubDetail');

// GET /api/cultural-club-details/:clubKey
router.get('/cultural-club-details/:clubKey', async (req, res) => {
  try {
    const club = await CulturalClubDetail.findOne({ clubKey: req.params.clubKey });
    if (club) {
      res.json(club);
    } else {
      res.status(404).json({ error: "Club not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch club details" });
  }
});

module.exports = router;