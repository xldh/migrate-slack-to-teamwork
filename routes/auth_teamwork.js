var express = require('express');
var twConfig = require('../config').teamworkProjects;
var url = require('url');
var router = express.Router();
var userSite = twConfig.userSite;
var teamworkRequestPromise = require('../utils/teamwork_request_promise');


router.post('/', function (req, res) {
    var user = req.user;
    var userSite = req.body.userSite;
    var apiKey = req.body.apiKey;

    teamworkRequestPromise({
        apiMethod: 'statuses',
        userSite: userSite,
        credentials: apiKey
    }).then(function (data) {
        user.teamworkApiKey = apiKey;
        user.teamworkUserSite = userSite;
        res.send(true);
    }).catch(function (req) {
        res.send(false);
    });

});

module.exports = router;
