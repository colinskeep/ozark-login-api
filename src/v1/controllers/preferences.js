const jwt = require('../components/jwt.js');
const registrationModel = require('../models/registration.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function getPref(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userProfile && userProfile.password === userObj.password) {
      res.status(200).json({
        language: userProfile.language,
        timeZone: userProfile.timeZone,
        currency: userProfile.currency,
        visibility: userProfile.visibility,
        messages: userProfile.messages,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postPref(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userObj && userProfile.password === userObj.password) {
      await registrationModel.findOneAndUpdate({email: userObj.email},
          {$set: {language: req.body.language,
            timeZone: req.body.timeZone,
            currency: req.body.currency,
            visibility: req.body.visibility,
            messages: req.body.messages,
          }},
          {upsert: true});
      res.status(200).json({data: true});
    }
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  getPref,
  postPref,
};
