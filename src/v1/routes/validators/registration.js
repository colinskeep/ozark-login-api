const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      name: Joi.string().min(1).max(40).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(30).required(),
    },
  },
};
