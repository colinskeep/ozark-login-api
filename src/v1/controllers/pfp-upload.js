const jwt = require('../components/jwt.js');
const imgupload = require('../components/imgupload.js');
const base64img = require('../components/base64img.js');
const sharp = require('sharp');
const registrationModel = require('../models/registration.js');
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
      const resized = await image
          .jpeg({
            quality: 100,
            chromaSubsampling: '4:4:4',
          })
          .resize({
            width: 200,
            height: 200,
          })
          .toBuffer();
      const uploaded = await imgupload.load(userProfile.id, resized, 'pfp_200x200.jpg');
      const b64 = await base64img.store(userProfile.id, resized);
      res.status(200).json({thumbnail: b64, status: uploaded, data: true});
    }
  } catch (err) {
    res.status(400).json({data: err});
    console.log(err);
  }
}


module.exports = {
  postNewPfp,
};
