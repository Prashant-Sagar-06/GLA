const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  images: [
    {
      url: String,
      alt: String
    }
  ]
}, { collection: 'homepage-images' }); // <-- specify collection name

module.exports = mongoose.model('Image', imageSchema);