const login = require('../components/login.js');
const jwt = require('../components/jwt.js');
const LogError = require('../components/LogError.js');
/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postLogin(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const findLog = await login.find(email, password);
    if (findLog.valid === true) {
      const token = await jwt.sign({name: findLog.name,
        email: findLog.email,
        password: findLog.password});
      res.status(200).json({jwt: token});
    } else {
      res.status(200).json({error: findLog.valid});
    }
  } catch (err) {
    return next(new LogError(err, 500, true));
  }
}

module.exports = {
  postLogin,
};
