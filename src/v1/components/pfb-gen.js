const imgupload = require('./imgupload.js');
const rao = require('./resizeAndOverlay.js');
const base64img = require('./base64img.js');
/**
 * Upload a random pfp to amazon s3
 * @param {string} id - incoming request
 * @param {string} backgroundFile - outgoing response
 */
async function gen(id, backgroundFile) {
  try {
    const resized = await rao.bkg(id, backgroundFile);
    const uploaded = await imgupload.load(id, resized, 'pfb_1160x150.jpg');
    const b64 = await base64img.storebkg(id, resized);
    return {pfbthumbnail: b64.pfbthumbnail, status: uploaded};
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  gen,
};
