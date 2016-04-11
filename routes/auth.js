var express = require('express');
var router = express.Router();
var slackRouter = require('./auth_slack');
var teamworkRouter = require('./auth_teamwork');

router.use('/slack', slackRouter);
router.use('/teamwork', teamworkRouter);

module.exports = router;
