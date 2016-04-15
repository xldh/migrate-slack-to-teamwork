var express = require('express');
var router = express.Router();
var ensureSlackAuthenticated = require('../middlewares/ensure_slack_authenticated');
var ensureTeamworkAuthenticated = require('../middlewares/ensure_teamwork_authenticated');
var slackRequestPromise = require('../utils/slack_request_promise');
var teamworkRequestPromise = require('../utils/teamwork_request_promise');
var Queue = require('bluebird-queue');

router.use(ensureSlackAuthenticated);

router.get('/importable-slack-users', ensureTeamworkAuthenticated, function (req, res) {
    var user = req.user;

    slackRequestPromise({
        apiMethod: 'users.list',
        credentials: user.accessToken
    }).then(function (data) {
        if (data.ok) {
            var myUser = data.members.filter(me)[0];
            var users = data.members.filter(notMe)
                                    .filter(notBot)
                                    .filter(hasEmail);

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


router.post('/import',  function (req, res) {
    var mainUserProfile = req.user.teamworkProfile;
    var users = req.body.users || [];
    var credentials = req.user.teamworkApiKey;
    var queue = new Queue();

    var users = prepareUsers(mainUserProfile, users);
    var importPromises = users.map(function (user) {
        return importUserPromise(user, credentials);
    });

    queue.add(importPromises);
    queue.start()
        .then(function () {
            res.send(true);
        }).catch(function () {
            res.send(false);
        });
});


function prepareUsers(mainUserProfile, users) {
    return users.map(function (user) {
        return prepareUser(mainUserProfile, user);
    });
}


function prepareUser(mainUserProfile, user) {
    prefillFields(user);
    copySharedFields(mainUserProfile, user);

    return user;
}


function prefillFields(user) {
    user.administrator = 'no';
    user['user-type'] = 'account';
}


function copySharedFields(me, user) {
    var companyId = me['company-id'];

    if (companyId) {
        user['company-id'] = companyId;
    }
}


function importUserPromise (user, credentials) {
    return teamworkRequestPromise({
        apiMethod: 'people',
        httpMethod: 'POST',
        credentials: credentials,
        data: { person: user }
    });
}


module.exports = router;
