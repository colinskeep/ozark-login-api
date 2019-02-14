const express = require('express');
const router = new express.Router();
const exampleRoute = require('./v1/routes/guest.js');
const healthRoute = require('./v1/routes/health.js');
const userRoute = require('./v1/routes/users.js');

router.use('/api/v1/guest', exampleRoute);
router.use('/api/v1/health', healthRoute);
router.use('/api/v1/users', userRoute);

module.exports = router;
