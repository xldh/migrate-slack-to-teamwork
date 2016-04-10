var ko = require('knockout');

function importFormComponent() {
    ko.components.register('import-form', {
        template: { element: 'import-form-template' }
    });
}

module.exports = importFormComponent;
