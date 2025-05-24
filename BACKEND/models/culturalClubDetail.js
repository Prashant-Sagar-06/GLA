const mongoose = require('mongoose');

const culturalClubDetailSchema = new mongoose.Schema({
  clubKey: { type: String, required: true, unique: true },
  clubName: String,
  presidentName: String,
  mentorName: String,
  presidentImage: String,
  mentorImage: String,
  description: String
}, { collection: 'cultural-club-details' });

module.exports = mongoose.model('CulturalClubDetail', culturalClubDetailSchema);