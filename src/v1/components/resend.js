const registrationModel = require('../models/registration.js');

/**
 * @param {string} email - user email
 * @param {string} verificationCode - emailed code
*/
async function log(email) {
  try {
    // console.log(email);
    const emailExists = await registrationModel.findOne({email: email});
    if (emailExists.email && emailExists.verificationCode
      && emailExists.verifiedEmail === false) {
      // console.log("found email in db -> resending email");
      return ({email: emailExists.email,
        verificationCode: emailExists.verificationCode});
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(`logger log. ${err}`);
    return false;
  }
}

module.exports = {
  log,
};
