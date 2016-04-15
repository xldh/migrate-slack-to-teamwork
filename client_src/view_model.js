var bindTeamworkState = require('./bindings/teamwork_state');

var bindingFunctions = [
    bindTeamworkState
];

function ViewModel(model) {
    bindingFunctions.forEach(function (bind) {
        bind.call(this, model);
    }, this);
}

module.exports = ViewModel;
