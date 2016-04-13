var express = require('express');
var router = express.Router();
var ensureSlackAuthenticated = require('../middlewares/ensure_slack_authenticated');
var slackRequestPromise = require('../utils/slack_request_promise');

router.get('/users', ensureSlackAuthenticated, function (req, res) {
    var user = req.user;

    slackRequestPromise({
        apiMethod: 'users.list',
        credentials: user.accessToken
    }).then(function (data) {
        if (data.ok) {
            var myUser = data.members.filter(me);
            var users = data.members.filter(notMe)
                                    .filter(notBot)
                                    .filter(hasEmail);

            console.log(users);

            user.teamworkProfile = myUser;
            res.send(users);
        } else {
            res.status(500).send({ error: 'Sorry something went wrong!' });
        }
    });

    function me (member) {
        return member.id === user.id;
    }

    function hasEmail (member) {
        return member.profile.email;
    }

    function notMe (member) {
        return !me(member);
    }


    function notBot (member) {
        return !member.is_bot;
    }
});


module.exports = router;
