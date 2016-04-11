var ko = require('knockout');

function importFormComponent() {
    ko.components.register('import-form', {
        viewModel: function (params) {
            console.log('new import form!');
            this.users = params.users;
            this.selected = ko.observableArray(this.users.slice());
            this.import = function () {
            };
        },
        template: { element: 'import-form-template' }
    });
}

module.exports = importFormComponent;
