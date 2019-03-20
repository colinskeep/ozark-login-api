const registrationModel = require('../models/registration.js');

/**
 * @param {string} term - username term
 * @param {string} verificationCode - emailed code
*/
async function userName(term) {
  try {
    const arr = [];
    const userNames = await registrationModel.find(
        {'name': {'$regex': term, '$options': 'i'}}, {name: 1, username: 1, lastSeen: 1}
    );
    const userEmails = await registrationModel.find(
        {'username': {'$regex': term, '$options': 'i'}}, {name: 1, username: 1, lastSeen: 1}
    );
    for (let i = 0; i <= userEmails.length; i++) {
      if (userEmails.length > 0 && userNames.map(function(e) {
        return e.username;
      }).indexOf(userEmails[i].username) === -1) {
        arr.push(userEmails[i]);
        if (i == userEmails.length - 1) {
          const results = {
            results: {name: userNames, username: arr},
          };
          return results;
        }
      } else {
        return ({results: {name: userNames, username: arr}});
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
