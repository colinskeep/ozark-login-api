const jwt = require('../components/jwt.js');
const registrationModel = require('../models/registration.js');
const milliseconds = (new Date).getTime();

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
  const followUser = await registrationModel.findOne({username: req.body.username});
  try {
    if (userObj && userProfile && userProfile.password === userObj.password && followUser) {
      await registrationModel.findOneAndUpdate({'email': userProfile.email, 'following.username': {$ne: followUser.username}},
          {$push: {following: {'username': followUser.username, 'since': milliseconds}}},
          {upsert: true});
      const follow = await registrationModel.findOneAndUpdate({'email': followUser.email, 'followers.username': {$ne: userProfile.username}},
          {$push: {followers: {'username': userProfile.username, 'since': milliseconds}}},
          {upsert: true});
      res.status(200).json({
        id: follow.id,
        name: follow.name,
        email: follow.email,
        username: follow.username,
        website: follow.website,
        location: follow.location,
        bio: follow.bio,
        dob: follow.dob,
        gender: follow.gender,
        followers: follow.followersCount,
        following: follow.followingCount,
      });
    }
    res.status(200).json({data: false});
  } catch (err) {
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
      followers: followUser.followersCount,
      following: followUser.followingCount,
    });
    console.log(err);
  }
}


module.exports = {
  newUser,
};
