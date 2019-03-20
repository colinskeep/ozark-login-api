const registrationModel = require('../models/registration.js');
const jwt = require('../components/jwt.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function getUser(req, res) {
  try {
    const userProfile = await registrationModel.findOne({username: req.query.username});
    if (typeof req.headers.authorization !== 'undefined') {
      const token = req.headers.authorization.split(' ')[1];
      const userObj = await jwt.resolve(token);
      const myProfile = await registrationModel.findOne({email: userObj.email});
    }
    const isMine = (typeof myProfile !== 'undefined' && typeof myProfile !== 'undefined' && userProfile.username == myProfile.username) ? true : false;
    console.log(isMine);
    if (userProfile) {
      res.status(200).json({
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email,
        username: userProfile.username,
        website: userProfile.website,
        location: userProfile.location,
        bio: userProfile.bio,
        dob: userProfile.dob,
        gender: userProfile.gender,
        followers: userProfile.followersCount,
        following: userProfile.followingCount,
        isMine,
      });
    } else {
      res.status(200).json({
        name: 'Not Found',
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getUser,
};
