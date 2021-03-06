const jwt = require('../components/jwt.js');
const registrationModel = require('../models/registration.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function getUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userProfile && userProfile.password === userObj.password) {
      res.status(200).json({
        name: userProfile.name,
        email: userProfile.email,
        username: userProfile.username,
        website: userProfile.website,
        location: userProfile.location,
        bio: userProfile.bio,
        dob: userProfile.dob,
        gender: userProfile.gender,
        thumbnail: userProfile.thumbnail,
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
 * @param {string} next - move on
 */
async function postUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userObj && userProfile.password === userObj.password) {
      const username = req.body.username.replace(/[^\w\s-]/ig, '');
      await registrationModel.findOneAndUpdate({email: userObj.email},
          {$set: {name: req.body.name,
            username,
            website: req.body.website,
            location: req.body.location,
            bio: req.body.bio,
            dob: req.body.dob,
            gender: req.body.gender,
          }},
          {upsert: true});
      if (userProfile.username != username) {
        console.log('username changed, updating all followers and followers');
        await registrationModel.updateMany(
            {'following': {$exists: true}},
            {'$set': {'following.$[elem].username': username}},
            {multi: true, arrayFilters: [{'elem.username': userProfile.username}]}
        );
        await registrationModel.updateMany(
            {'followers': {$exists: true}},
            {'$set': {'followers.$[elem].username': username}},
            {multi: true, arrayFilters: [{'elem.username': userProfile.username}]}
        );
      }
      res.status(200).json({data: true});
    }
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  getUser,
  postUser,
};
