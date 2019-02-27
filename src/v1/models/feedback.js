const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: {type: String},
  feedback: {type: String},
});

module.exports = mongoose.model('feedback', feedbackSchema);
