const express = require('express');
const validate = require('express-validation');
const contactController = require('../controllers/contact.js');

const router = new express.Router();

const contact = require('./validators/contact.js');

router.route('/contact/').post(
    validate(contact.validate), contactController.postContact);

module.exports = router;
