const mongoose = require('mongoose');

const CouncilMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String
}, { collection: 'hoepage-dean-council' });

module.exports = mongoose.model('CouncilMember', CouncilMemberSchema);