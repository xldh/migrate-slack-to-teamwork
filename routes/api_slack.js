var express = require('express');
var router = express.Router();
var ensureSlackAuthenticated = require('../ensure_authenticated_middleware');
var slackRequestPromise = require('../utils/slack_request_promise');

router.get('/users', ensureSlackAuthenticated, function (req, res) {
    var user = req.user;

    slackRequestPromise({
        apiMethod: 'users.list',
        credentials: user.accessToken
    }).then(function (data) {
        if (data.ok) {
            res.send(data.members);
        } else {
            res.status(500).send({ error: 'Sorry something went wrong!' });
        }
    });
});

module.exports = router;
