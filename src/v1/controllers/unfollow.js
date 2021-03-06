const jwt = require('../components/jwt.js');
const registrationModel = require('../models/registration.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function newUser(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  const userObj = await jwt.resolve(token);
  const userProfile = await registrationModel.findOne({email: userObj.email});
  const unfollowUser = await registrationModel.findOne({username: req.body.username});
  try {
    if (userObj && userProfile && userProfile.password === userObj.password && unfollowUser) {
      await registrationModel.findOneAndUpdate({email: userProfile.email},
          {$pull: {following: {username: unfollowUser.username}}},
          {upsert: true});
      const unfollow = await registrationModel.findOneAndUpdate({email: unfollowUser.email},
          {$pull: {followers: {username: userProfile.username}}},
          {upsert: true, new: true});
      res.status(200).json({
        id: unfollow.id,
        name: unfollow.name,
        email: unfollow.email,
        username: unfollow.username,
        website: unfollow.website,
        location: unfollow.location,
        bio: unfollow.bio,
        dob: unfollow.dob,
        gender: unfollow.gender,
        followers: unfollow.followers.length,
        following: unfollow.following.length,
        imFollowing: false,
      });
    }
    res.status(200).json({data: false});
  } catch (err) {
    res.status(200).json({
      id: unfollowUser.id,
      name: unfollowUser.name,
      email: unfollowUser.email,
      username: unfollowUser.username,
      website: unfollowUser.website,
      location: unfollowUser.location,
      bio: unfollowUser.bio,
      dob: unfollowUser.dob,
      gender: unfollowUser.gender,
      followers: unfollowUser.followersCount,
      following: unfollowUser.followingCount,
    });
    console.log(err);
  }
}


module.exports = {
  newUser,
};
