const available = require('../components/available.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function postAvailable(req, res) {
  try {
    const restrictedPath = ['help', 'mobile', 'settings', 'profiles'];
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
postAvailable({
  body: {
    username: 'colinskeep',
  }
})

module.exports = {
  postAvailable,
};
