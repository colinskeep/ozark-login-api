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
    let myProfile = '';
    let followingSince = '';
    let followerSince = '';
    if (typeof req.headers.authorization !== 'undefined' && req.headers.authorization.split(' ')[1] !== 'null') {
      const token = req.headers.authorization.split(' ')[1];
      const userObj = await jwt.resolve(token);
      myProfile = await registrationModel.findOne({email: userObj.email});
    }
    const isMine = (myProfile !== '' && typeof userProfile !== 'undefined' && userProfile.username == myProfile.username) ? true : false;
    const usersImFollowing = myProfile.following.map(function(e) {
      return e.username;
    });
    const usersFollowingMe = myProfile.followers.map(function(f) {
      return f.username;
    });
    const imFollowing = (myProfile !== '' && typeof userProfile !== 'undefined'
      && usersImFollowing.indexOf(userProfile.username) > - 1) ? true : false;
    const followingMe = (myProfile !== '' && typeof userProfile !== 'undefined'
      && usersFollowingMe.indexOf(userProfile.username) > - 1) ? true : false;
    const followingIndex = usersImFollowing.indexOf(userProfile.username);
    const followerIndex = usersFollowingMe.indexOf(userProfile.username);
    if (imFollowing) {
      console.log(myProfile.following[followingIndex].since);
      followingSince = myProfile.following[followingIndex].since;
    }
    if (followingMe) {
      console.log(myProfile.followers[followerIndex].since);
      followerSince = myProfile.followers[followerIndex].since;
    }
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
        thumbnail: userProfile.thumbnail,
        isMine,
        imFollowing,
        followingMe,
        followingSince,
        followerSince,
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

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function getFollowers(req, res) {
  const data = await registrationModel.findOne({username: req.query.username});
  res.status(200).json({
    followers: data.followers,
  });
}

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function getFollowing(req, res) {
  const data = await registrationModel.findOne({username: req.query.username});
  res.status(200).json({
    following: data.following,
  });
}

module.exports = {
  getUser,
  getFollowers,
  getFollowing,
};
