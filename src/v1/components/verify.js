const registrationModel = require('../models/registration.js');

/**
 * @param {string} email - user email
 * @param {string} verificationCode - emailed code
*/
async function log(email, verificationCode) {
  try {
    const emailExists = await registrationModel.findOne({email: email});
    if (emailExists.verificationCode == verificationCode) {
      await registrationModel.findOneAndUpdate({email},
          {$set: {
            verifiedEmail: true,
            emailNotifications: {
              message: true,
              follow: true,
              newsletter: true,
            },
            alertNotifications: {
              message: true,
              follow: true,
              newsletter: true,
            },
          }},
          {upsert: true});
      return {
        data: true,
        id: emailExists._id,
        name: emailExists.name,
      };
    } else {
      return false;
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
