var ko = require('knockout');

function importDoneComponent() {
    ko.components.register('import-done', {
        template: { element: 'import-done-template' }
    });
}


module.exports = importDoneComponent;
