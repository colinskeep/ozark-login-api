const available = require('./available.js');

/**
 * @param {string} emailPrefix - email username
*/
async function get(emailPrefix) {
  try {
    const sanitized = await emailPrefix.replace(/[^\w\s-]/ig, '');
    const getUserName = await available.userName(sanitized);
    console.log(getUserName);
    if (getUserName.nameAvailable == false) {
      const retry = emailPrefix + (Math.floor(Math.random() * 900) + 99).toString();
      return await get(retry);
    } else if (getUserName.nameAvailable == true) {
      return emailPrefix;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  get,
};
