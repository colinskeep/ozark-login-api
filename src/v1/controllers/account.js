const jwt = require('../components/jwt.js');
const request = require('request');
const registrationModel = require('../models/registration.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function getToken(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userObj = await jwt.resolve(token);
    const userProfile = await registrationModel.findOne({email: userObj.email});
    if (userObj && userProfile.password === userObj.password) {
      request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
          oauth_callback: 'https://ozark-prod.herokuapp.com/',
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_SECRET_KEY,
        },
      }, function(err, e, body) {
        if (err) {
          return res.send(500, {message: e.message});
        }
        var jsonStr = JSON.parse('{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}');
        jsonStr.oauth_nonse = Math.floor(Math.random()*90000000) + 10000000;
        jsonStr.oauth_timestamp = (new Date).getTime();
        jsonStr.oauth_consumer_key = process.env.TWITTER_CONSUMER_KEY;
        registrationModel.findOneAndUpdate({email: userProfile.email},
            {$set: {
              twitter: {
                oauth_token: jsonStr.oauth_token,
                loggedIn: false,
              },
            }},
            {upsert: true});
        console.log('****************', jsonStr);
        res.send(jsonStr);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function getApiKeys(req, res) {
  try {
    console.log(req.query.oauth_token);
    console.log(req.query.oauth_verifier);
    request.post({
      url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
      oauth: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_SECRET_KEY,
        token: req.query.oauth_token,
      },
      form: {oauth_verifier: req.query.oauth_verifier},
    }, function(err, e, body) {
      var jsonStr = JSON.parse('{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}');
      console.log('____________________________', req.query.oauth_token, jsonStr);
      registrationModel.findOneAndUpdate({twitter: {oauth_token: req.query.oauth_token}},
          {$set: {
            twitter: {
              oauth_token: jsonStr.oauth_token,
              loggedIn: true,
            },
          }},
          {upsert: true});
      res.redirect('https://dev.eostokens.app/settings/accounts/');
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getToken,
  getApiKeys,
};
