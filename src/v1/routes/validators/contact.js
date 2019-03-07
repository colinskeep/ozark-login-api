const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      enquiry: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      message: Joi.string().required(),
    },
  },
};
