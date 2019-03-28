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
 * @param {string} data - move on
 */
async function load(id, data) {
  const upload = await s3.putObject({
    Key: `${id}/pfp_200x200.jpg`,
    Bucket: process.env.AWS_BUCKET,
    ACL: 'public-read',
    Body: data,
  }).promise();
  return upload;
}

module.exports = {
  load,
};
