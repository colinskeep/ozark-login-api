const available = require('../components/available.js');
const jwt = require('../components/jwt.js');
const registrationModel = require('../models/registration.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function postAvailable(req, res) {
  try {
    const restrictedPath = ['help', 'mobile', 'settings', 'profiles'];
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const userObj = await jwt.resolve(token);
      const userProfile = await registrationModel.findOne({email: userObj.email});
      if (userProfile.username == req.body.username) {
        res.status(200).json({nameAvailable: true, allowedWords: true});
      }
    }
    const searchResults = await available.userName(req.body.username);
    if (searchResults && restrictedPath.indexOf(req.body.username.toLowerCase()) < 0 && /[^\w\s-]/ig.test(req.body.username) === false) {
      res.status(200).json(searchResults);
    } else {
      res.status(200).json({nameAvailable: false, allowedWords: false});
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`logger log. ${err}`);
    res.status(400);
  }
}

module.exports = {
  postAvailable,
};
