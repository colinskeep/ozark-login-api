const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(30).required(),
    },
  },
};
