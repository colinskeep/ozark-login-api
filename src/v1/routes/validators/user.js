const Joi = require('joi');

module.exports = {
  validate: {
    query: {
      username: Joi.string(),
    },
  },
};
