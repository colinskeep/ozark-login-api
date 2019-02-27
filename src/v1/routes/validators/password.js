const Joi = require('joi');

module.exports = {
  validate: {
    authorization: Joi.string()
        .regex(/^Bearer [a-zA-Z0-9]{1,}[.][a-zA-Z0-9]{1,}[.][a-zA-Z0-9-_]{1,}$/)
        .min(6).error(() => 'Invalid Authorization Key'),
    body: {
      password: Joi.string().min(6).max(30).required(),
    },
  },
};
