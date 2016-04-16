var ko = require('knockout');
var makeObservable = require('../utils/observable').makeObservable;
var dataFromObservable = require('../utils/observable').dataFromObservable;
var importUsers = require('../apis/teamwork_api').importUsers;
var fetchUsers = require('../apis/slack_teamwork_bridge').fetchTeamworkableUsers;

function importFormComponent() {
    ko.components.register('import-form', {
        viewModel: function (params) {
            var component = this;

            component.apiState = params.apiState;
            component.users = ko.observableArray();
            component.selectedUsers = ko.observableArray();

            console.log('teamworkLoggedIn', true);

            fetchUsers()
                .then(function (users) {
                    component.users(users.map(makeObservable));
                    component.selectAll();
                    component.apiState.loadingUsers(false);
                });


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

                component.apiState.importingUsers(true);

                importUsers(users).then(function (data) {
                    console.log('importUsers', data);
                    component.apiState.importingUsers(false);
                }).fail(function () {
                    component.apiState.importingUsers(false);
                });
            };
        },
        template: { element: 'import-form-template' }
    });
}


module.exports = importFormComponent;
