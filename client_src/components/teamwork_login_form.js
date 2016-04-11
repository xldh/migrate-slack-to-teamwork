var ko = require('knockout');
var twApi = require('../apis/teamwork_api');

function teamworkLoginFormComponent() {
    ko.components.register('teamwork-login-form', {
        viewModel: function (params) {
            var component = this;

            component.apiKey = '';
            component.teamworkLoggedIn = params.teamworkLoggedIn;

            component.login = function () {
                twApi.login(component.apiKey)
                    .then(function (success) {
                        console.log(success);
                        component.teamworkLoggedIn(success);
                    });
            };
        },
        template: { element: 'teamwork-login-form-template' }
    });
}

module.exports = teamworkLoginFormComponent;
