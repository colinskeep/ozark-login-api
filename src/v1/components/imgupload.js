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
 * @param {string} name - name of file
 */
async function load(id, data, name) {
  const upload = await s3.putObject({
    Key: `${id}/${name}`,
    Bucket: process.env.AWS_BUCKET,
    ContentType: 'image/jpeg',
    ACL: 'public-read',
    Body: data,
  }).promise();
  return upload;
}

module.exports = {
  load,
};
