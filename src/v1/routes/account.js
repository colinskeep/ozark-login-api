const express = require('express');
const accountController = require('../controllers/account.js');
const router = new express.Router();

router.route('/twitter/').post(accountController.getToken);

module.exports = router;
