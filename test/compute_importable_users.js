var assert = require('chai').assert;
var computeImportableUsers = require('../utils/compute_importable_users');

var someSlackUsers = [{
    profile: {
        email: 'test@gmail.com'
    }
}, {
    profile: {
        email: 'another-test@gmail.com'
    }
}, {
    profile: {
        email: 'test-3@gmail.com'
    }
}];


describe('computeImportableUsers()', function() {
    it('should return all Slack users when none are present in the Teamwork users list', function () {
        var importableUsers = computeImportableUsers(someSlackUsers, [{
            'email-address': 'tw-test@gmail.com'
        }, {
            'email-address': 'tw-another-test@gmail.com'
        }]);

        assert.deepEqual(someSlackUsers, importableUsers);
    });

    it('should not return Slack users present in the Teamwork users list', function () {
        var importableUsers = computeImportableUsers(someSlackUsers, [{
            'email-address': 'test@gmail.com' // this is a duplicate
        }, {
            'email-address': 'tw-another-test@gmail.com'
        }]);

        assert.notEqual(someSlackUsers, importableUsers);
    });

    it('should return all Slack users when no Teamwork users given', function () {
        var importableUsers = computeImportableUsers(someSlackUsers, []);
        assert.deepEqual(someSlackUsers, importableUsers);
    });

    it('should return an empty array when no Slack users given', function () {
        var slackUsers = [];
        var teamworkUsers = [{
            'email-address': 'test@gmail.com'
        }];

        var importableUsers = computeImportableUsers(slackUsers, teamworkUsers);

        assert.equal(importableUsers.length, 0);
    });
});
