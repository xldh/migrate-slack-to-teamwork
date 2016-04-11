var express = require('express');
var router = express.Router();
var slackRouter = require('./api_slack');
var teamworkRouter = require('./api_teamwork');

router.use('/slack', slackRouter);
router.use('/teamwork', teamworkRouter);

module.exports = router;
