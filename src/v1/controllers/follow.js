const jwt = require('../components/jwt.js');
const registrationModel = require('../models/registration.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function newUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    const followUser = await registrationModel.findOne({username: req.body.username});
    if (userObj && userProfile && userProfile.password === userObj.password && followUser) {
      await registrationModel.findOneAndUpdate({email: userProfile.email, following: {$ne: followUser.username}},
          {$push: {following: followUser.username}, $set: {followingCount: userProfile.following.length + 1}},
          {upsert: true});
      await registrationModel.findOneAndUpdate({email: followUser.email, followers: {$ne: userProfile.username}},
          {$push: {followers: userProfile.username}, $set: {followersCount: followUser.followers.length}},
          {upsert: true});
      res.status(200).json({
        id: followUser.id,
        name: followUser.name,
        email: followUser.email,
        username: followUser.username,
        website: followUser.website,
        location: followUser.location,
        bio: followUser.bio,
        dob: followUser.dob,
        gender: followUser.gender,
        followers: followUser.followersCount + 1,
        following: followUser.followingCount,
      });
    }
    res.status(200).json({data: false});
  } catch (err) {
    res.status(200).json({followingUser: true});
    console.log(err);
  }
}


module.exports = {
  newUser,
};
