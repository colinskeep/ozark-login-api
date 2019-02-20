const express = require('express');
const validate = require('express-validation');
const searchController = require('../controllers/search.js');
const profileController = require('../controllers/profile.js');
const router = new express.Router();

const search = require('./validators/search.js');
const profile = require('./validators/profile.js');

router.route('/search/').post(
    validate(search.validate), searchController.postSearch);

router.route('/profile/').get(
    validate(profile.validate), profileController.getUser);

router.route('/profile/').post(
    validate(profile.validate), profileController.postUser);

module.exports = router;
