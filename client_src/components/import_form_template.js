var ko = require('knockout');

function importFormComponent() {
    ko.components.register('import-form', {
        viewModel: function (params) {
            console.log('new import form!');
            this.show = params.show;
        },
        template: { element: 'import-form-template' }
    });
}

module.exports = importFormComponent;
