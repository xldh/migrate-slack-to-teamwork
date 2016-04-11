var ko = require('knockout');
var editableFields = require('../apis/slack_teamwork_bridge').teamworkUserEditableFields;

function userEditableComponent() {
    ko.components.register('user-editable', {
        viewModel: function (params) {
            var component = this;
            console.log(params.user);
            component.fields = editableFields;
            component.user = makeObservable(params.user);
            component.fullName = ko.pureComputed(function () {
                return component.user['first-name']() + ' ' + component.user['last-name']();
            });
        },
        template: { element: 'user-editable-template' }
    });
}

function makeObservable(object) {
    return Object.keys(object)
                 .map(extractKeyEntry)
                 .reduce(implodeIntoObservable, {});


    function extractKeyEntry(key) {
        var entry = object[key];

        if (Array.isArray(entry)) {
            entry = ko.observableArray(entry);
        } else {
            entry = ko.observable(entry);
        }

        return [key, entry];
    }


    function implodeIntoObservable(observable, keyEntry) {
        var key = keyEntry[0];
        var entry = keyEntry[1];

        observable[key] = entry;

        return observable;
    }
}

module.exports = userEditableComponent;
