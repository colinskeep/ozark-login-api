const registrationModel = require('../models/registration.js');
const jwt = require('../components/jwt.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function getUser(req, res) {
  try {
    console.log(req.headers.authorization);
    const userProfile = await registrationModel.findOne({username: req.query.username});
    let myProfile = '';
    console.log(req.headers.authorization)
    if (typeof req.headers.authorization !== 'undefined') {
      console.log('jwt found');
      const token = req.headers.authorization.split(' ')[1];
      const userObj = await jwt.resolve(token);
      myProfile = await registrationModel.findOne({email: userObj.email});
    }
    const isMine = (myProfile !== '' && typeof userProfile !== 'undefined' && userProfile.username == myProfile.username) ? true : false;
    const imFollowing = (myProfile !== '' && typeof userProfile !== 'undefined' && myProfile.following.indexOf(userProfile.username) > - 1) ? true : false;
    const followingMe = (myProfile !== '' && typeof userProfile !== 'undefined' && myProfile.followers.indexOf(userProfile.username) > - 1) ? true : false;
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
        imFollowing,
        followingMe,
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
