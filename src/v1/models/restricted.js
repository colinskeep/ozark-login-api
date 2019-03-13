const mongoose = require('mongoose');

const restrictedWordSchema = new mongoose.Schema({
  restricted_word: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('restrictedwords', restrictedWordSchema);
