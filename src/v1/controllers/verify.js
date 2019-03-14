const verify = require('../components/verify.js');
const jwt = require('../components/jwt.js');
const LogError = require('../components/LogError.js');
const pfp = require('../components/pfp-gen.js');
const ungen = require('../components/un-gen.js');
/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postValidate(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const code = req.body.code;
    const userObj = await jwt.resolve(token);
    const emailPrefix = userObj.email.split('@')[0];
    const username = ungen.get(emailPrefix);
    console.log(username);
    const verifyCode = await verify.log(userObj.email, username, code);
    const firstLetter = (userObj.name.match(/[a-zA-Z]/) == null) ?
     'undefined' :
      (userObj.name.match(/[a-zA-Z]/) || []).pop().toUpperCase();
    if (verifyCode.data === true) {
      await pfp.gen(verifyCode.id, 'images/background.jpg', firstLetter);
      res.status(200).json({
        data: true,
        id: verifyCode.id,
        name: verifyCode.name,
        username: verifyCode.username,
      });
    } else {
      res.status(200).json({data: false});
    }
  } catch (err) {
    return next(new LogError(err, 500, true));
  }
}

module.exports = {
  postValidate,
};
