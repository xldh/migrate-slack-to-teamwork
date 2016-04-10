var ko = require('knockout');

function teamworkLoginFormComponent() {
    ko.components.register('teamwork-login-form', {
        viewModel: function (params) {
            this.teamworkLoggedIn = false;
        },
        template: { element: 'teamwork-login-form-template' }
    });
}

module.exports = teamworkLoginFormComponent;
