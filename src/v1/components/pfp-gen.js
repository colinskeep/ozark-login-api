const imgupload = require('./imgupload.js');
const rao = require('./resizeAndOverlay.js');
const base64img = require('./base64img.js');
/**
 * Upload a random pfp to amazon s3
 * @param {string} id - incoming request
 * @param {string} backgroundFile - outgoing response
 * @param {string} firstLetter - move on
 */
async function gen(id, backgroundFile, firstLetter) {
  try {
    const resized = await rao.do(id, firstLetter);
    console.log('resized', resized);
    const uploaded = await imgupload.load(id, resized);
    console.log('uploaded', uploaded);
    const b64 = await base64img.store(id, resized);
    console.log('b64', b64);
    return b64;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  gen,
};
