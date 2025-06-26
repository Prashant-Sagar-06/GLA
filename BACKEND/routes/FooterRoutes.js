const express = require('express');
const router = express.Router();
const Footer = require('../models/Footer');

// GET /api/footer
router.get('/footer', async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ error: "Footer not found" });
    }
    res.json(footer);
  } catch (err) {
    console.error('Error fetching footer:', err);
    res.status(500).json({ error: "Failed to fetch footer from database" });
  }
});

module.exports = router;