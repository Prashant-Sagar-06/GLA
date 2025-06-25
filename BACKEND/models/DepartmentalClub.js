const mongoose = require('mongoose');

const DepartmentalClubSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  link: String
});

module.exports = mongoose.model('DepartmentalClub', DepartmentalClubSchema);