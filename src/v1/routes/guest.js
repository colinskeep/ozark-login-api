const express = require('express');
const validate = require('express-validation');
const registrationController = require('../controllers/registration.js');
const verifyController = require('../controllers/verify.js');
const resendController = require('../controllers/resend.js');
const loginController = require('../controllers/login.js');
const router = new express.Router();

const registration = require('./validators/registration.js');
const verify = require('./validators/verify.js');
const resend = require('./validators/resend.js');
const login = require('./validators/login.js');

router.route('/join/').post(
    validate(registration.validate), registrationController.postRegister);

router.route('/verify/').post(
    validate(verify.validate), verifyController.postValidate);

router.route('/resend/').post(
    validate(resend.validate), resendController.postResend);

router.route('/login/').post(
    validate(login.validate), loginController.postLogin);


module.exports = router;
