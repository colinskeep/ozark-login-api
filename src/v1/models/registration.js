const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String, unique: true},
  password: {type: String},
  verificationCode: {type: Number},
  verifiedEmail: {type: Boolean},
});

module.exports = mongoose.model('registration', registrationSchema);
