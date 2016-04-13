var ko = require('knockout');
var makeObservable = require('../utils/observable').makeObservable;
var editableFields = require('../apis/slack_teamwork_bridge').teamworkUserEditableFields;

function userEditableComponent() {
    ko.components.register('user-editable', {
        viewModel: function (params) {
            var component = this;
            component.id = params.id;
            component.fields = editableFields;
            component.user = params.user;
            component.fullName = ko.pureComputed(function () {
                return component.user['first-name']() + ' ' + component.user['last-name']();
            });
        },
        template: { element: 'user-editable-template' }
    });
}


module.exports = userEditableComponent;
