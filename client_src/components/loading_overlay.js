var ko = require('knockout');
var $ = require('jquery');


function loadingOverlayComponent() {
    ko.components.register('loading-overlay', {
        viewModel: function (params) {
            var component = this;
            var apiState = params.apiState;

            var states = [
                apiState.loggingIn,
                apiState.importingUsers,
                apiState.loadingUsers
            ];



            component.loading = ko.pureComputed(function () {
                return states.some(isTrue);
            });

            function isTrue (observable) {
                return !!observable();
            }
        },
        template: { element: 'loading-overlay-template' }
    });
}

module.exports = loadingOverlayComponent;
