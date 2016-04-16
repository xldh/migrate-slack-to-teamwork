var ko = require('knockout');

function registerFadeHandler() {
    ko.bindingHandlers.fade = {
        init: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).hide(value);
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            value ? $(element).fadeIn(280) : $(element).fadeOut();
        }
    };
}

module.exports = registerFadeHandler;
