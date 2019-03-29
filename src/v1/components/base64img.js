const sharp = require('sharp');
const registrationModel = require('../models/registration.js');
const imageupload = require('./imgupload.js');

/**
 * Upload a random pfp to amazon s3
 * @param {string} id - incoming request
 * @param {string} resized - move on
 */
async function store(id, resized) {
  try {
    const thumbnail = await sharp(resized).resize(20, 20).toBuffer();
    const b64 = await thumbnail.toString('base64');
    const user = await registrationModel.findOneAndUpdate({_id: id}, {$set: {thumbnail: b64}}, {upsert: true, new: true});
    return user;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Upload a random pfp to amazon s3
 * @param {string} id - incoming request
 * @param {string} resized - move on
 */
async function storebkg(id, resized) {
  try {
    const thumbnail = await sharp(resized).resize(300, 39).toBuffer();
    const upload = await imageupload.load(id, thumbnail, 'pfb_300x39.jpg');
    const b64 = await thumbnail.toString('base64');
    const user = await registrationModel.findOneAndUpdate({_id: id}, {$set: {pfbthumbnail: b64}}, {upsert: true, new: true});
    return {user, upload};
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  store,
  storebkg,
};
