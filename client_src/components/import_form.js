var ko = require('knockout');
var makeObservable = require('../utils/observable').makeObservable;
var dataFromObservable = require('../utils/observable').dataFromObservable;
var importUsers = require('../apis/teamwork_api').importUsers;

function importFormComponent() {
    ko.components.register('import-form', {
        viewModel: function (params) {
            var component = this;

            component.toggleSelection = function (user) {
                console.log('toggleSelection', user);

                if (component.isSelected(user)) {
                    component.deselect(user);
                    console.log('user will NOT be imported', user['email-address']());
                } else {
                    component.select(user);
                    console.log('user will be imported', user['email-address']());
                }
            };


            component.select = function (user) {
                if (!component.isSelected(user)) {
                    component.selectedUsers.push(user);
                }
            };


            component.deselect = function (user) {
                var indexOfUser = component.selectedUsers().indexOf(user);

                if (indexOfUser !== - 1) {
                    component.selectedUsers.splice(indexOfUser, 1);
                }

                console.log(component.selectedUsers());
            }


            component.deselectAll = function () {
                component.selectedUsers().length = 0;
            };


            component.selectAll = function () {
                component.selectedUsers().forEach(component.select);
            };


            component.isSelected = function (user) {
                return component.selectedUsers().indexOf(user) !== -1;
            };


            component.importUsers = function () {
                var users = component.selectedUsers().map(dataFromObservable);

                importUsers(users).then(function (data) {
                    console.log('importUsers', data);
                });
            };

            component.users = ko.observableArray(params.users().map(makeObservable));
            component.selectedUsers = ko.observableArray();

            component.selectAll();
        },
        template: { element: 'import-form-template' }
    });
}


module.exports = importFormComponent;
