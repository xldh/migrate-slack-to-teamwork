var api = require('./apis/slack_teamwork_bridge');
var ko = require('knockout');
var registerEverything = require('./register_everything');
var ViewModel = require('./view_model');

init();


function init() {
    registerEverything();
    initViewModel();
    initMaterial();
}


function initMaterial() {
    $.material.init();
}

function initViewModel() {
    var viewModel = new ViewModel();

    ko.applyBindings(viewModel);

    return viewModel;
}
