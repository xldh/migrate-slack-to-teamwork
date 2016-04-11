var ko = require('knockout');

function importFormComponent() {
    ko.components.register('import-form', {
        viewModel: function (params) {
            console.log('new import form!');
            this.users = params.users;
            console.log(params);
        },
        template: { element: 'import-form-template' }
    });
}

module.exports = importFormComponent;
