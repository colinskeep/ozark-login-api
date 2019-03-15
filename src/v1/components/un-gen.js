const available = require('./available.js');

/**
 * @param {string} emailPrefix - email username
*/
async function get(emailPrefix) {
  try {
    const getUserName = await available.userName(emailPrefix);
    console.log(getUserName);
    if (getUserName.nameAvailable == false) {
      const retry = emailPrefix + (Math.floor(Math.random() * 900) + 99).toString();
      await get(retry);
    } else {
      return emailPrefix;
    }
  } catch (error) {
    console.log(error);
  }
}

get('colinskeep');
module.exports = {
  get,
};
