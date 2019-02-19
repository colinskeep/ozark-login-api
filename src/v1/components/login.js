const registrationModel = require('../models/registration.js');
const bcrypt = require('bcrypt');
/**
 * @param {string} email - user email
 * @param {string} password - user apssword
*/
async function find(email, password) {
  try {
    const emailExists = await registrationModel.findOne({email: email});
    if (!emailExists) {
      return {valid: 'email not found'};
    }

    if (emailExists && emailExists.verifiedEmail === false) {
      return {valid: 'email not verified'};
    }

    if (emailExists && emailExists.verifiedEmail === true) {
      const match = await bcrypt.compare(password, emailExists.password);
      if (match) {
        return {valid: true,
          id: emailExists._id,
          name: emailExists.name,
          email: emailExists.email,
          password: emailExists.password,
        };
      } else {
        return {valid: 'password not match'};
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(`logger log. ${err}`);
    return err.code;
  }
}

module.exports = {
  find,
};
