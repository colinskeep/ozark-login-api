const resend = require('../components/resend.js');
const jwt = require('../components/jwt.js');
const sgMail = require('@sendgrid/mail');
const LogError = require('../components/LogError.js');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postResend(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const jwtDetails = await jwt.resolve(token);
    const emailInfo = await resend.log(jwtDetails.email);
    await sgMail.send({
      to: `${emailInfo.email}`,
      from: process.env.EMAIL_SENDER,
      subject: process.env.EMAIL_SUBJECT,
      text: 'test',
      html: `<strong> ${emailInfo.verificationCode} </strong>`,
    });
  } catch (err) {
    return next(new LogError(err, 500, true));
  }
}

module.exports = {
  postResend,
};
