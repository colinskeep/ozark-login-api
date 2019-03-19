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
    if (userObj && userProfile.password === userObj.password && followUser) {
      await registrationModel.findOneAndUpdate({email: userObj.email},
          {$push: {following: req.body.username}, $set: {followingCount: userProfile.following.length + 1}},
          {upsert: true});
      await registrationModel.findOneAndUpdate({email: followUser.email},
          {$push: {followers: userProfile.username}, $set: {followersCount: followUser.followers.length}},
          {upsert: true});
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
        followers: userProfile.followersCount + 1,
        following: userProfile.followingCount,
      });
    }
    res.status(200).json({data: false});
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  newUser,
};
