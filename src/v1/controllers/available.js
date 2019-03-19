const available = require('../components/available.js');
const jwt = require('../components/jwt.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function postAvailable(req, res) {
  try {
    const restrictedPath = ['help', 'mobile', 'settings', 'profiles'];
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const userObj = await jwt.resolve(token);
      if (userObj.username == req.body.username) {
        res.status(200).json({nameAvailable: true, allowedWords: true});
      }
    }
    const searchResults = await available.userName(req.body.username);
    if (searchResults && restrictedPath.indexOf(req.body.username.toLowerCase()) < 0) {
      console.log(searchResults);
      res.status(200).json(searchResults);
    } else {
      res.status(200).json({nameAvailable: false, allowedWords: false});
    }
    return searchResults;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`logger log. ${err}`);
    res.status(400);
  }
}

module.exports = {
  postAvailable,
};
