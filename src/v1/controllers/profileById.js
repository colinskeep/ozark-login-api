const registrationModel = require('../models/registration.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function getUser(req, res) {
  try {
    const userProfile = await registrationModel.findOne({username: req.query.id});
    if (userProfile) {
      res.status(200).json({
        name: userProfile.name,
        email: userProfile.email,
        username: userProfile.username,
        website: userProfile.website,
        location: userProfile.location,
        bio: userProfile.bio,
        dob: userProfile.dob,
        gender: userProfile.gender,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getUser,
};
