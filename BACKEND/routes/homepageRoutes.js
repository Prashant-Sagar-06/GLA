const express = require('express');
const router = express.Router();
const { getHomepageData } = require('../controllers/homepageController');
const Image = require('../models/Image');
const DeanInfo = require('../models/DeanInfo');
const Footer = require('../models/Footer');

router.get('/homepage', getHomepageData);

// Fetch images array for homepage slider
router.get('/images', async (req, res) => {
  try {
    const doc = await Image.findOne(); // Get the first document
    if (doc && doc.images) {
      res.json(doc.images); // Return only the images array
    } else {
      res.json([]); // Return empty array if not found
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Get dean info
router.get('/dean', async (req, res) => {
  try {
    const dean = await DeanInfo.findOne();
    if (dean) {
      res.json(dean);
    } else {
      res.status(404).json({ error: "Dean info not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dean info" });
  }
});

// Get footer info
router.get('/footer', async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (footer) {
      res.json(footer);
    } else {
      res.status(404).json({ error: "Footer info not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch footer info" });
  }
});

module.exports = router;
