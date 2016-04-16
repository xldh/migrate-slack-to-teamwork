var bindApiState = require('./bindings/api_state');
var bindTeamworkState = require('./bindings/teamwork_state');

var bindingFunctions = [
    bindApiState,
    bindTeamworkState
];

function ViewModel(model) {
    bindingFunctions.forEach(function (bind) {
        bind.call(this, model);
    }, this);
}

module.exports = ViewModel;
