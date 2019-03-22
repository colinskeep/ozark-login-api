const registrationModel = require('../models/registration.js');

/**
 * @param {string} email - user details
*/
async function update(email) {
  try {
    const milliseconds = (new Date).getTime();
    const update = await registrationModel.findOneAndUpdate({email},
        {$set: {lastSeen: milliseconds}});
    return update;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  update,
};
