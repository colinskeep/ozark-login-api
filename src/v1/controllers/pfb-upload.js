const jwt = require('../components/jwt.js');
const registrationModel = require('../models/registration.js');
const sharp = require('sharp');
const imgupload = require('../components/imgupload.js');
const base64img = require('../components/base64img.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postNewPfb(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userObj && userProfile.password === userObj.password &&
      req.file.mimetype.split('/')[0]== 'image') {
      const image = await sharp(`./uploads/${req.file.filename}`);
      const resized = await image.jpeg({
        quality: 100,
        chromaSubsampling: '4:4:4',
      }).resize({
        width: 1160,
        height: 150,
      }).toBuffer();
      const uploaded = await imgupload.load(userProfile.id, resized, 'pfb_1160x150.jpg');
      const b64 = await base64img.storebkg(userProfile.id, resized);
      res.status(200).json({
        id: userProfile.id,
        data: true,
        thumbnail: b64.pfbthumbnail,
        status: uploaded.status,
      });
    }
  } catch (err) {
    res.status(400).json({data: err});
    console.log(err);
  }
}


module.exports = {
  postNewPfb,
};
