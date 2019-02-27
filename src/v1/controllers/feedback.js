const jwt = require('../components/jwt.js');
const registrationModel = require('../models/registration.js');
const feedbackModel = require('../models/feedback.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postFb(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userObj && userProfile.password === userObj.password) {
      await feedbackModel.create({
        email: userObj.email,
        feedback: req.body.feedback,
      });
      res.status(200).json({data: true});
    } else {
      res.status(400).json({data: false});
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postFb,
};
