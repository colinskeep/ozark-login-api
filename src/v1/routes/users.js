const express = require('express');
const validate = require('express-validation');
const searchController = require('../controllers/search.js');
const router = new express.Router();

const search = require('./validators/search.js');

router.route('/search/').post(
    validate(search.validate), searchController.postSearch);

module.exports = router;
