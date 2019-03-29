const sharp = require('sharp');

/**
 * Upload a random pfp to amazon s3
 * @param {string} id - incoming request
 * @param {string} backgroundFile - background file
 * @param {string} firstLetter - move on
 */
async function work(id, backgroundFile, firstLetter) {
  const image = await sharp(backgroundFile);
  const metadata = await image.metadata();
  const leftMargin = Math.floor(Math.random() * (metadata.width - 200));
  const topMargin = Math.floor(Math.random() * (metadata.height - 200));
  if (firstLetter != 'undefined') {
    const imposed = await image
        .extract({left: leftMargin, top: topMargin, width: 200, height: 200})
        .overlayWith(`images/letters/${firstLetter}.png`)
        .toBuffer();
    return imposed;
  } else {
    const imposed = await image
        .extract({left: leftMargin, top: topMargin, width: 200, height: 200})
        .toBuffer();
    return imposed;
  }
}
/**
 * Upload a random pfp to amazon s3
 * @param {string} id - incoming request
 * @param {string} backgroundFile - move on
 */
async function bkg(id, backgroundFile) {
  const image = await sharp(backgroundFile);
  const metadata = await image.metadata();
  const leftMargin = Math.floor(Math.random() * (metadata.width - 1160));
  const topMargin = Math.floor(Math.random() * (metadata.height - 150));
  const imposed = await image
      .extract({left: leftMargin, top: topMargin, width: 1160, height: 150})
      .toBuffer();
  return imposed;
}

module.exports = {
  work,
  bkg,
};
