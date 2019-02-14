const registration = require('../components/registration.js');
const jwt = require('../components/jwt.js');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const LogError = require('../components/LogError.js');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postRegister(req, res, next) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 12);
    const writeLog = await registration.log(
        name, email, password);
    if (writeLog.valid === true) {
      const token = await jwt.sign({name, email, password});
      res.status(200).json({jwt: token});
      await sgMail.send({
        to: `${email}`,
        from: process.env.EMAIL_SENDER,
        subject: process.env.EMAIL_SUBJECT,
        text: 'test',
        html: `<strong> ${writeLog.verificationCode} </strong>`,
      });
    } else {
      res.status(200).json({error: writeLog.err});
    }
  } catch (err) {
    return next(new LogError(err, 500, true));
  }
}

module.exports = {
  postRegister,
};
