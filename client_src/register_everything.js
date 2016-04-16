var userEditableComponent = require('./components/user_editable');
var teamworkLoginFormComponent = require('./components/teamwork_login_form');
var importFormComponent = require('./components/import_form');
var importDoneComponent = require('./components/import_done');
var loadingOverlayComponent = require('./components/loading_overlay');

var slideBindingHandler = require('./binding_handlers/slide');
var fadeBindingHandler = require('./binding_handlers/fade');


var functionsToRegister = [
    importFormComponent,
    importDoneComponent,
    userEditableComponent,
    teamworkLoginFormComponent,
    loadingOverlayComponent,
    slideBindingHandler,
    fadeBindingHandler
];


function registerEverything() {
    functionsToRegister.forEach(function (functionToRegister) {
        functionToRegister();
    });
}

module.exports = registerEverything;
