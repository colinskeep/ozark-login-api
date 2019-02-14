const search = require('../components/search.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 */
async function postSearch(req, res) {
  try {
    const searchResults = await search.userName(req.body.term);
    if (searchResults) {
      res.status(200).json(searchResults);
    } else {
      res.status(200).json({data: false});
    }
    return searchResults;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`logger log. ${err}`);
    res.status(400);
  }
}

module.exports = {
  postSearch,
};
