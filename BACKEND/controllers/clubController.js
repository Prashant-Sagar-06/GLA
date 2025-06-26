const CulturalClub = require('../models/CulturalClub');
const DepartmentalClub = require('../models/DepartmentalClub');

// Get all cultural clubs
exports.getCulturalClubs = async (req, res) => {
    try {
        const clubs = await CulturalClub.find();
        res.json(clubs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cultural clubs' });
    }
};

// Get all departmental clubs
exports.getDepartmentalClubs = async (req, res) => {
    try {
        const clubs = await DepartmentalClub.find();
        res.json(clubs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch departmental clubs' });
    }
};