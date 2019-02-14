const verify = require('../components/verify.js');
const jwt = require('../components/jwt.js');
const LogError = require('../components/LogError.js');
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
    if (verifyCode === true) {
      res.status(200).json({data: true});
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
