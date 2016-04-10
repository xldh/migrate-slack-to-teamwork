var ko = require('knockout');

function userFormComponent() {
    ko.components.register('user-form', {
        viewModel: function (params) {
            this.user = params.user;
        },
        template: { element: 'user-form-template' }
    });
}

module.exports = userFormComponent;
