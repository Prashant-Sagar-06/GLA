const mongoose = require('mongoose');

const homepageSchema = new mongoose.Schema({
    deanName: String,
    deanTitle: String,
    deanMessage: String,
    deanImage: String, // Store image URL or path
    // Add more fields like sliders, social links, etc. as needed
});

module.exports = mongoose.model('Homepage', homepageSchema);
