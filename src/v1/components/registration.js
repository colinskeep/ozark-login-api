const registrationModel = require('../models/registration.js');

/**
 * @param {string} name - user name
 * @param {string} email - user email
 * @param {string} password - user apssword
 * @param {string} verificationCode - emailed code
 * @param {bool} verifiedEmail - did they verify email
*/
async function log(name, email, password) {
  console.log(name, email, password)
  try {
    const emailExists = await registrationModel.findOne({email: email});
    if (!emailExists) {
      // console.log("new email found - adding to db");
      const verificationCode = Math.floor(Math.random()*(999999-100000+1)+100000);
      await registrationModel.findOneAndUpdate({email},
          {$set: {name, email, password, verificationCode, verifiedEmail: false}},
          {upsert: true});
      return {valid: true, verificationCode};
    }

    if (emailExists && emailExists.verifiedEmail === false) {
      // console.log("email already exists -> updating pw and sending email");
      await registrationModel.findOneAndUpdate({email},
          {$set: {password}},
          {upsert: true});
      return {valid: true, verificationCode: emailExists.verificationCode};
    }

    if (emailExists && emailExists.verifiedEmail === true) {
      // console.log("email already validated -> not sending email");
      return {valid: false, err: 11101};
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(`logger log. ${err}`);
    return err.code;
  }
}

module.exports = {
  log,
};
