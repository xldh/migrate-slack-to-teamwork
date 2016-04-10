var bindUsers = require('./bindings/user_list');
var bindTeamworkState = require('./bindings/teamwork_state');

var bindingFunctions = [
    bindUsers,
    bindTeamworkState
];

function ViewModel(model) {
    bindingFunctions.forEach(function (bind) {
        bind.call(this, model);
    }, this);
}

module.exports = ViewModel;
