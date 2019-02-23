const verify = require('../components/verify.js');
const jwt = require('../components/jwt.js');
const LogError = require('../components/LogError.js');
const pfp = require('../components/pfp-gen.js');
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
    const verifyCode = await verify.log(userObj.email, code);
    const firstLetter = (userObj.name.match(/[a-zA-Z]/) == null) ?
     'undefined' :
      (userObj.name.match(/[a-zA-Z]/) || []).pop().toUpperCase();
    if (verifyCode.data === true) {
      await pfp.gen(verifyCode.id, 'images/background.jpg', firstLetter);
      res.status(200).json({
        data: true,
        id: verifyCode.id,
        name: verifyCode.name,
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
