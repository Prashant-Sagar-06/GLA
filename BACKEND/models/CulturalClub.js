const mongoose = require('mongoose');

const culturalClubSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  link: String
}, { collection: 'cultural-clubs' }); // <-- use your collection name

module.exports = mongoose.model('CulturalClub', culturalClubSchema);