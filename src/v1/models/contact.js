const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  enquiry: {type: String},
  name: {type: String},
  email: {type: String},
  message: {type: String},
});

module.exports = mongoose.model('contact', contactSchema);
