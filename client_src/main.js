var api = require('./apis/slack_teamwork_bridge');
var ko = require('knockout');
var registerComponents = require('./register_components');
var ViewModel = require('./view_model');

init();

function init() {
    api.fetchTeamworkableUsers()
        .then(initViewModel)
        .then(registerComponents);
}


function initViewModel(users) {
    var viewModel = new ViewModel({
        users: users
    });

    ko.applyBindings(viewModel);
}
