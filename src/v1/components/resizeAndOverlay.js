const sharp = require('sharp');

/**
 * Upload a random pfp to amazon s3
 * @param {string} id - incoming request
 * @param {string} firstLetter - move on
 */
async function do(id, firstLetter) {
  const image = await sharp('images/background.jpg');
  await image
      .metadata()
      .then(function(metadata) {
        const leftMargin = Math.floor(Math.random() * (metadata.width - 200));
        const topMargin = Math.floor(Math.random() * (metadata.height - 200));
        if (firstLetter != 'undefined') {
          return image
              .extract({left: leftMargin, top: topMargin, width: 200, height: 200})
              .overlayWith(`images/letters/${firstLetter}.png`)
              .toBuffer(function(err, data) {
                return data;
              });
        }
      });
}

module.exports = {
  do,
};
