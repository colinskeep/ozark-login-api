const sharp = require('sharp');
const registrationModel = require('../models/registration.js');

/**
 * Upload a random pfp to amazon s3
 * @param {string} id - incoming request
 * @param {string} resized - move on
 */
async function base64img(id, resized) {
  try {
    const thumbnail = await sharp(resized).resize(20, 20).toBuffer();
    const b64 = await thumbnail.toString('base64');
    const user = await registrationModel.findOneAndUpdate({_id: id}, {$set: {thumbnail: b64}}, {upsert: true, new: true});
    return user;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  base64img,
};
