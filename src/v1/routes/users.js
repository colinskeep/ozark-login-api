const express = require('express');
const validate = require('express-validation');
const searchController = require('../controllers/search.js');
const profileController = require('../controllers/profile.js');
const pfpController = require('../controllers/pfp-upload.js');
const prefController = require('../controllers/preferences.js');
const notifController = require('../controllers/notifications.js');
const passController = require('../controllers/password.js');

const router = new express.Router();
const multer = require('multer');
const upload = multer({dest: './uploads/'});

const search = require('./validators/search.js');
const profile = require('./validators/profile.js');
const preferences = require('./validators/preferences.js');
const notifications = require('./validators/notifications.js');
const password = require('./validators/password.js');

router.route('/search/').post(
    validate(search.validate), searchController.postSearch);

router.route('/profile/').get(
    validate(profile.validate), profileController.getUser);

router.route('/profile/').post(
    validate(profile.validate), profileController.postUser);

router.route('/profile/upload-pfp/').post(
    validate(profile.validate), upload.single('image'), pfpController.postNewPfp);

router.route('/preferences/').post(
    validate(preferences.validate), prefController.postPref);

router.route('/preferences/').get(
    validate(preferences.validate), prefController.getPref);

router.route('/notifications/').get(
    validate(notifications.validate), notifController.getNotif);

router.route('/notifications/').post(
    validate(notifications.validate), notifController.postNotif);

router.route('/password/').post(
    validate(password.validate), passController.postPass);

module.exports = router;
