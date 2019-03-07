const jwt = require('../components/jwt.js');
const aws = require('aws-sdk');
const registrationModel = require('../models/registration.js');
const sharp = require('sharp');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESSID,
  region: process.env.AWS_BUCKETREGION,
});
const s3 = new aws.S3();
/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postNewPfp(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userObj && userProfile.password === userObj.password &&
      req.file.mimetype.split('/')[0]== 'image') {
      const image = sharp(`./uploads/${req.file.filename}`);
      image
          .jpeg({
            quality: 100,
            chromaSubsampling: '4:4:4',
          })
          .resize({
            width: 1160,
            height: 150,
          })
          .toBuffer(function(err, data) {
            s3.putObject({
              Key: `${userProfile.id}/pfb_1160x150.jpg`,
              Bucket: process.env.AWS_BUCKET,
              ACL: 'public-read',
              Body: data,
            }, ( err, status ) => {
              if (err) throw err;
              res.status(200).json({data: true,
                status});
            });
          });
    }
  } catch (err) {
    res.status(400).json({data: err});
    console.log(err);
  }
}


module.exports = {
  postNewPfp,
};
