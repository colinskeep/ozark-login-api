const sharp = require('sharp');

/**
 * Upload a random pfp to amazon s3
 * @param {string} id - incoming request
 * @param {string} firstLetter - move on
 */
async function work(id, firstLetter) {
  const image = await sharp('images/background.jpg');
  const metadata = await image.metadata();
  const leftMargin = Math.floor(Math.random() * (metadata.width - 200));
  const topMargin = Math.floor(Math.random() * (metadata.height - 200));
  const imposed = await image
      .extract({left: leftMargin, top: topMargin, width: 200, height: 200})
      .overlayWith(`images/letters/${firstLetter}.png`)
      .toBuffer();
  return imposed;
}

module.exports = {
  work,
};
