const Homepage = require('../models/homepage');

exports.getHomepageData = async (req, res) => {
    try {
        const data = await Homepage.findOne(); // Assuming single document
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch homepage data' });
    }
};
