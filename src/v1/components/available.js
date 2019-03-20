const registrationModel = require('../models/registration.js');
const restrictedWordsModel = require('../models/restricted.js');

/**
 * @param {string} term - username term
 * @param {string} verificationCode - emailed code
*/
async function userName(term) {
  try {
    const sanitized = term.replace(/[^\w\s-]/ig, '');
    const userNames = await registrationModel.findOne(
        {username: sanitized}, {username: 1}
    );
    const restrictedWords = await restrictedWordsModel.findOne(
        {'restricted_word': sanitized}, {username: 1}
    );
    const nameAvailable = (userNames == null) ? true : false;
    const allowedWords = (restrictedWords == null) ? true: false;
    return {nameAvailable, allowedWords, term};
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`logger log. ${err}`);
    return false;
  }
}

module.exports = {
  userName,
};
