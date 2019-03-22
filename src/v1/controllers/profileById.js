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
    if (typeof req.headers.authorization !== 'undefined' && req.headers.authorization.split(' ')[1] !== 'null') {
      const token = req.headers.authorization.split(' ')[1];
      const userObj = await jwt.resolve(token);
      myProfile = await registrationModel.findOne({email: userObj.email});
    }
    const isMine = (myProfile !== '' && typeof userProfile !== 'undefined' && userProfile.username == myProfile.username) ? true : false;
    const imFollowing = (myProfile !== '' && typeof userProfile !== 'undefined'
      && myProfile.following.map(function(e) {
        return e.username;
      }).indexOf(userProfile.username) > - 1) ? true : false;
    console.log('im following: ', imFollowing);
    const followingMe = (myProfile !== '' && typeof userProfile !== 'undefined'
      && myProfile.followers.map(function(f) {
        return f.username;
      }).indexOf(userProfile.username) > - 1) ? true : false;
    console.log('is following me: ', followingMe);
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
        followers: userProfile.followers.length,
        following: userProfile.following.length,
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
