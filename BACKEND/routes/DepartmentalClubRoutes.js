const express = require('express');
const router = express.Router();
const DepartmentalClub = require('../models/DepartmentalClub');

// Get all departmental clubs
router.get('/departmental-clubs', async (req, res) => {
  try {
    const clubs = await DepartmentalClub.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch departmental clubs" });
  }
});

module.exports = router;