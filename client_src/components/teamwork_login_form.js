var ko = require('knockout');
var twApi = require('../apis/teamwork_api');
var fetchUsers = require('../apis/slack_teamwork_bridge').fetchTeamworkableUsers;

function teamworkLoginFormComponent() {
    ko.components.register('teamwork-login-form', {
        viewModel: function (params) {
            var component = this;
            var apiState = params.apiState;

            component.apiKey = '';
            component.teamworkLoggedIn = params.teamworkLoggedIn;

            component.login = function () {
                apiState.loggingIn(true);
                apiState.loadingUsers(true);

                twApi.login(component.apiKey)
                    .then(function (success) {
                        apiState.loggingIn(false);
                        component.teamworkLoggedIn(success);
                    }).fail(function (err) {
                        apiState.loggingIn(false);
                    });
            };

        },
        template: { element: 'teamwork-login-form-template' }
    });
}

module.exports = teamworkLoginFormComponent;
