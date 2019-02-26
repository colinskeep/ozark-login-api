const jwt = require('../components/jwt.js');
const registrationModel = require('../models/registration.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function getNotif(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userProfile && userProfile.password === userObj.password) {
      res.status(200).json({
        emailMessage: userProfile.emailNotifications.message,
        emailFollow: userProfile.emailNotifications.follow,
        emailNewsletter: userProfile.emailNotifications.newsletter,
        notifyMessage: userProfile.alertNotifications.message,
        notifyFollow: userProfile.alertNotifications.follow,
        notifyNewsletter: userProfile.alertNotifications.newsletter,
      });
    }
  } catch (err) {
    console.log(err)
  }
}

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postNotif(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userObj && userProfile.password === userObj.password) {
      await registrationModel.findOneAndUpdate({email: userObj.email},
          {$set: {
            emailNotifications: {
              message: req.body.emailMessage,
              follow: req.body.emailFollow,
              newsletter: req.body.emailNewsletter,
            },
            alertNotifications: {
              message: req.body.notifyMessage,
              follow: req.body.notifyFollow,
              newsletter: req.body.notifyNewsletter,
            },
          }},
          {upsert: true});
      res.status(200).json({data: true});
    }
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  getNotif,
  postNotif,
};
