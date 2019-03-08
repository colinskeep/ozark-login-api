const express = require('express');
const accountController = require('../controllers/account.js');
const router = new express.Router();

router.route('/twitter/').post(accountController.getToken);
router.route('/twitter').get(accountController.getApiKeys);

module.exports = router;
