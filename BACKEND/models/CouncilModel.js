const mongoose = require('mongoose');

const CouncilMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String // Store image URL or relative path
});

module.exports = mongoose.model('CouncilMember', CouncilMemberSchema);