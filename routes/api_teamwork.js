var express = require('express');
var router = express.Router();
var ensureSlackAuthenticated = require('../middlewares/ensure_slack_authenticated');
var teamworkRequestPromise = require('../utils/teamwork_request_promise');
var Queue = require('bluebird-queue');

router.use(ensureSlackAuthenticated);
router.use(ensureTeamworkAuthenticated);

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


function ensureTeamworkAuthenticated (req, res, next) {
    if (req.user.teamworkApiKey) {
        return next();
    }

    res.sendStatus(401);
}

module.exports = router;
