const lang = require('../translations/translations.js');
/**
 * Function to generate email html
 * @param {string} emailSender - from email address
 * @param {string} email - to email address
 * @param {string} mode - light or dark models
 * @param {string} verificationCode - 6 digit verification code
 * @param {string} language - language to use
 * @return {string} html
 */
function set(emailSender, email, mode, verificationCode, language) {
  switch (mode) {
    case 'dark':
      var htmlStyle = `<html  style="background-color: #121212; color:#EEEEEE; font-family: 'Hanken Grotesk', 'Helvetica Neue', sans-serif;">`;
      var divStyle = `<div style="width: 100%; max-width: 500px; margin: 0 auto; background-color: #303030; border-radius: 4px; padding: 48px; margin-top: 24px; box-shadow: inset 0 1px 0 #121212, 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);">`;
      break;
    case 'light':
      var htmlStyle = `<html style="background-color: #EEEEEE; color:#232323; font-family: 'Hanken Grotesk', 'Helvetica Neue', sans-serif;">`;
      var divStyle = `<div style="width: 100%; max-width: 500px; margin: 0 auto; background-color: white; border-radius: 4px; padding: 48px; margin-top: 24px; box-shadow: inset 0 1px 0 #f5f5f5, 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);">`
      break;
  }
  return {
    to: email,
    from: emailSender,
    subject: lang.trans[language].verifyAccount,
    html: `<!DOCTYPE html>
      ${htmlStyle}
          <body>
              ${divStyle}
              <h1 style="font-weight: 300;">${lang.trans[language].verifyAccount}</h1>
              <p>${lang.trans[language].enterCode}</p>
              <h2>${verificationCode}</h2>
              <p>${lang.trans[language].dontShare}</p>
              </br>
              <p>${lang.trans[language].thankYouForJoining}</p>
              </div>
          </body>
      </html>`,
  }
}
module.exports = {
  set,
};
