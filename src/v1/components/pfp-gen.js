const sharp = require('sharp');
const aws = require('aws-sdk');
const registrationModel = require('../models/registration.js');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESSID,
  region: process.env.AWS_BUCKETREGION,
});
const s3 = new aws.S3();
/**
 * Upload a random pfp to amazon s3
 * @param {string} id - incoming request
 * @param {string} backgroundFile - outgoing response
 * @param {string} firstLetter - move on
 */
async function gen(id, backgroundFile, firstLetter) {
  try {
    console.log(s3)
    const image = sharp('images/background.jpg');
    image
        .metadata()
        .then(function(metadata) {
          const leftMargin = Math.floor(Math.random() * (metadata.width - 200));
          const topMargin = Math.floor(Math.random() * (metadata.height - 200));
          if (firstLetter != 'undefined') {
            return image
                .extract({left: leftMargin, top: topMargin, width: 200, height: 200})
                .overlayWith(`images/letters/${firstLetter}.png`)
                .toBuffer(async function(err, data) {
                  const resized = await sharp(data).resize(20, 20).toBuffer();
                  const b64 = await resized.toString('base64');
                  const user = await registrationModel.findOneAndUpdate({_id: id}, {$set: {thumbnail: b64}}, {upsert: true, new: true});
                  await s3.putObject({
                    Key: `${id}/pfp_200x200.jpg`,
                    Bucket: process.env.AWS_BUCKET,
                    ACL: 'public-read',
                    Body: data,
                  }, ( err, status ) => {
                    console.log(status);
                    return {b64: user.b64, status: status};
                  });
                });
          } else {
            return image
                .extract({left: leftMargin, top: topMargin, width: 200, height: 200})
                .toBuffer(async function(err, data) {
                  const resized = await sharp(data).resize(20, 20).toBuffer();
                  const b64 = await resized.toString('base64');
                  const user = await registrationModel.findOneAndUpdate({_id: id}, {$set: {thumbnail: b64}}, {upsert: true, new: true});
                  await s3.putObject({
                    Key: `${id}/pfp_200x200.jpg`,
                    Bucket: process.env.AWS_BUCKET,
                    ACL: 'public-read',
                    Body: data,
                  }, ( err, status ) => {
                    console.log(status);
                    return {b64: user.b64, status: status};
                  });
                });
          }
        });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  gen,
};
