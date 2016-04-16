var ko = require('knockout');

function registerSlideHandler() {
    ko.bindingHandlers.slide = {
        init: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var $element = $(element);
            $element.css('display', 'block');
            $element.hide(value);
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var $element = $(element);
            value ? $element.slideDown(600) : $element.slideUp();
        }
    };
}

module.exports = registerSlideHandler;
