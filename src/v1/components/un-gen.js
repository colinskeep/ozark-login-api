const available = require('./available.js');

/**
 * @param {string} emailPrefix - email username
*/
async function get(emailPrefix) {
  try {
    const getUserName = available.userName(emailPrefix);
    if (getUserName.nameAvailable == false) {
      const retry = emailPrefix + (Math.floor(Math.random() * 900) + 99).toString();
      get(retry);
    } else {
      return emailPrefix;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  get,
};
