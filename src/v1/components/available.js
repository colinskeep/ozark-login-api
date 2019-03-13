const registrationModel = require('../models/registration.js');
const restrictedWordsModel = require('../models/restricted.js');

/**
 * @param {string} term - username term
 * @param {string} verificationCode - emailed code
*/
async function userName(term) {
  try {
    const userNames = await registrationModel.findOne(
        {'username': term}, {username: 1}
    );
    console.log(userNames);
    const restrictedWords = await restrictedWordsModel.findOne(
        {'restricted_word': term}, {username: 1}
    );
    console.log(restrictedWords);
    const nameAvailable = (userNames == null) ? true : false;
    const allowedWords = (restrictedWords == null) ? true: false;
    return {nameAvailable, allowedWords};
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`logger log. ${err}`);
    return false;
  }
}

module.exports = {
  userName,
};
