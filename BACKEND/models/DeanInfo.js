const mongoose = require('mongoose');

const deanInfoSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  name: String,
  description: String,
  image: String
}, { collection: 'homepage-dean' }); // <-- specify collection name

module.exports = mongoose.model('DeanInfo', deanInfoSchema);