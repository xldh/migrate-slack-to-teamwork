var userEditableComponent = require('./components/user_editable');
var teamworkLoginFormComponent = require('./components/teamwork_login_form');
var importFormComponent = require('./components/import_form_template');

var components = [
    importFormComponent,
    userEditableComponent,
    teamworkLoginFormComponent
];


function registerComponents() {
    components.forEach(function (component) {
        component();
    });
}

module.exports = registerComponents;
