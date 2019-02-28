const registrationModel = require('../models/registration.js');

/**
 * @param {string} term - username term
 * @param {string} verificationCode - emailed code
*/
async function userName(term) {
  try {
    const arr = [];
    const userNames = await registrationModel.find(
        {'name': {'$regex': term, '$options': 'i'}}, {id: 1, name: 1, lastSeen: 1}
    );
    const userEmails = await registrationModel.find(
        {'email': {'$regex': term, '$options': 'i'}}, {id: 1, name: 1, lastSeen: 1}
    );
    for (let i = 0; i <= userEmails.length; i++) {
      if (userEmails.length > 0 && userNames.map(function(e) {
        return e.id;
      }).indexOf(userEmails[i].id) === -1) {
        arr.push(userEmails[i]);
        if (i == userEmails.length - 1) {
          const results = {
            results: {name: userNames, email: arr},
          };
          return results;
        }
      } else {
        return ({results: {name: userNames, email: arr}});
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`logger log. ${err}`);
    return false;
  }
}

module.exports = {
  userName,
};
