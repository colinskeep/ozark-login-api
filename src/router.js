const express = require('express');
const router = new express.Router();
const exampleRoute = require('./v1/routes/guest.js');
const healthRoute = require('./v1/routes/health.js');
const userRoute = require('./v1/routes/users.js');
const accountRoute = require('./v1/routes/account.js');

router.use('/api/v1/guest', exampleRoute);
router.use('/api/v1/health', healthRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/accounts/', accountRoute);

module.exports = router;
