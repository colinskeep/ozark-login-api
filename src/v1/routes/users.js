const express = require('express');
const validate = require('express-validation');
const searchController = require('../controllers/search.js');
const profileController = require('../controllers/profile.js');
const pfpController = require('../controllers/pfp-upload.js');
const prefController = require('../controllers/preferences.js');
const notifController = require('../controllers/notifications.js');
const passController = require('../controllers/password.js');
const feedbackController = require('../controllers/feedback.js');
const pfbController = require('../controllers/pfb-upload.js');
const availableController = require('../controllers/available.js');
const profileByIdController = require('../controllers/profileById.js');
const followController = require('../controllers/follow.js');
const unfollowController = require('../controllers/unfollow.js');

const router = new express.Router();
const multer = require('multer');
const upload = multer({dest: './uploads/'});

const search = require('./validators/search.js');
const profile = require('./validators/profile.js');
const preferences = require('./validators/preferences.js');
const notifications = require('./validators/notifications.js');
const password = require('./validators/password.js');
const feedback = require('./validators/feedback.js');
const available = require('./validators/available.js');
const users = require('./validators/user.js');
const follow = require('./validators/follow.js');

router.route('/search/').post(
    validate(search.validate), searchController.postSearch);

router.route('/profile/').get(
    validate(profile.validate), profileController.getUser);

router.route('/profile/').post(
    validate(profile.validate), profileController.postUser);

router.route('/profile/id/').get(
    validate(users.validate), profileByIdController.getUser);

router.route('/profile/id/following/').get(
    validate(users.validate), profileByIdController.getFollowing);

router.route('/profile/id/followers/').get(
    validate(users.validate), profileByIdController.getFollowers);

router.route('/profile/follow/').post(
    validate(follow.validate), followController.newUser);

router.route('/profile/unfollow/').post(
    validate(follow.validate), unfollowController.newUser);

router.route('/profile/upload-pfp/').post(
    validate(profile.validate), upload.single('image'), pfpController.postNewPfp);

router.route('/profile/upload-pfb/').post(
    validate(profile.validate), upload.single('image'), pfbController.postNewPfb);

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

router.route('/feedback/').post(
    validate(feedback.validate), feedbackController.postFb);

router.route('/available/').post(
    validate(available.validate), availableController.postAvailable);

module.exports = router;
