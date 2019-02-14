const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      term: Joi.string().min(1).max(40).required(),
    },
  },
};
