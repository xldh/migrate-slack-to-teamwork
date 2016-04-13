var ko = require('knockout');
var makeObservable = require('../utils/observable').makeObservable;
var dataFromObservable = require('../utils/observable').dataFromObservable;
var importUsers = require('../apis/teamwork_api').importUsers;

function importFormComponent() {
    ko.components.register('import-form', {
        viewModel: function (params) {
            var component = this;
            component.users = params.users;
            component.selected = ko.observableArray(component.users().map(makeObservable));

            component.importUsers = function () {
                var users = component.selected().map(dataFromObservable);

                importUsers(users).then(function (data) {
                    console.log('importUsers', data);
                });
            };
        },
        template: { element: 'import-form-template' }
    });
}


module.exports = importFormComponent;
