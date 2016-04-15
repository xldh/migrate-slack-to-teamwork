var api = require('./apis/slack_teamwork_bridge');
var ko = require('knockout');
var registerComponents = require('./register_components');
var ViewModel = require('./view_model');

init();


function init() {
    registerComponents();
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
