const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  address: String,
  phone: String,
  email: String,
  apps: [{ url: String, img: String, alt: String }],
  social: [{ url: String, img: String, alt: String }]
}, { collection: 'homepage-footer' }); // <-- specify collection name

module.exports = mongoose.model('Footer', footerSchema);