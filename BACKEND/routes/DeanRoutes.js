const express = require('express');
const router = express.Router();
const DeanInfo = require('../models/DeanInfo');

 router.get('/dean', async (req, res) => {
  try {
    const dean = await DeanInfo.findOne();
    if (!dean) {
      return res.status(404).json({ error: "Dean not found" });
    }
    res.json(dean);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dean from database" });
  }
});

module.exports = router;