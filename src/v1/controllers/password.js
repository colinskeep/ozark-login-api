const registration = require('../models/registration.js');
const jwt = require('../components/jwt.js');
const bcrypt = require('bcrypt');
const LogError = require('../components/LogError.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postPass(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registration.findOne({email: userObj.email});
    if (userObj && userProfile.password === userObj.password) {
      const password = await bcrypt.hash(req.body.password, 12);
      const update = await registration.findOneAndUpdate({email: userObj.email},
          {$set: {password}}, {upsert: true});
      const newToken = await jwt.sign({
        name: update.name,
        email: update.email,
        password: update.password,
      });
      res.status(200).json({jwt: newToken});
    } else {
      res.status(400).json({data: false});
    }
  } catch (err) {
    return next(new LogError(err, 500, true));
  }
}

module.exports = {
  postPass,
};
