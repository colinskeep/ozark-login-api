const jwt = require('../components/jwt.js');
const aws = require('aws-sdk');
const registrationModel = require('../models/registration.js');
const multer = require('multer');
const multerS3 = require('multer-s3');

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
    console.log("this file:", req.file);
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userObj && userProfile.password === userObj.password) {
      multer({
        storage: multerS3({
          s3: s3,
          bucket: process.env.AWS_BUCKET,
          key: function(req, file, cb) {
            cb(null, Date.now().toString());
          },
        }),
      });
      res.status(200).json({data: true});
    }
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  postNewPfp,
};
