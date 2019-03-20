const registrationModel = require('../models/registration.js');

/**
 * @param {string} email - user details
*/
async function update(email) {
  const milliseconds = (new Date).getTime();
  const update = await registrationModel.findOneAndUpdate({email},
      {$set: {lastSeen: milliseconds}});
  return update;
}

module.exports = {
  update,
};
