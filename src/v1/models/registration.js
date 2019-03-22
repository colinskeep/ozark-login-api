const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String, unique: true},
  username: {type: String, unique: true},
  password: {type: String},
  memberSince: {type: String},
  website: {type: String},
  location: {type: String},
  bio: {type: String},
  dob: {type: String},
  gender: {type: String},
  verificationCode: {type: Number},
  verifiedEmail: {type: Boolean},
  language: {type: String},
  timeZone: {type: String},
  currency: {type: String},
  visibility: {type: String},
  messages: {type: String},
  emailNotifications: {
    message: Boolean,
    follow: Boolean,
    newsletter: Boolean,
  },
  alertNotifications: {
    message: Boolean,
    follow: Boolean,
    newsletter: Boolean,
  },
  twitter: {
    oauth_token: String,
    oauth_access_token: String,
    loggedIn: Boolean,
  },
  lastSeen: {type: String},
  following: [{username: {type: String, unique: true}, since: String}],
  followers: [{username: {type: String, unique: true}, since: String}],
});

module.exports = mongoose.model('registration', registrationSchema);
