var ko = require('knockout');

function registerFadeHandler() {
    ko.bindingHandlers.fade = {
        init: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).hide(value);
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            console.log('fade', value);
            value ? $(element).fadeTo(250, 1) : $(element).fadeOut();
        }
    };
}

module.exports = registerFadeHandler;
