const sharp = require('sharp');
const aws = require('aws-sdk');

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
function gen(id, backgroundFile, firstLetter) {
  const image = sharp('images/background.jpg');
  image
      .metadata()
      .then(function(metadata) {
        const leftMargin = Math.floor(Math.random() * (metadata.width - 200));
        const topMargin = Math.floor(Math.random() * (metadata.height - 200));
        return image
            .extract({left: leftMargin, top: topMargin, width: 200, height: 200})
            .overlayWith(`images/letters/${firstLetter}.png`)
            .toBuffer(function(err, data) {
              s3.putObject({
                Key: `${id}/pfp_200x200.jpg`,
                Bucket: process.env.AWS_BUCKET,
                ACL: 'public-read',
                Body: data,
              }, ( err, status ) => {
                return ( 'status:::', status );
              } );
            });
      });
}

module.exports = {
  gen,
};
