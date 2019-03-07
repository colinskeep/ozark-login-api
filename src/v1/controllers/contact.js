const contactModel = require('../models/contact.js');

/**
 * Function to execute when endpoint reached
 * @param {string} req - incoming request
 * @param {string} res - outgoing response
 * @param {string} next - move on
 */
async function postContact(req, res, next) {
  try {
    if (req.body) {
      await contactModel.create({
        inquiry: req.body.inquiry,
        name: req.body.name,
        email: req.body.email,
        feedback: req.body.message,
      });
      res.status(200).json({data: true});
    } else {
      res.status(400).json({data: false});
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postContact,
};
