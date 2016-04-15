var ko = require('knockout');
var $ = require('jquery');


function loadingOverlayComponent() {
    ko.components.register('loading-overlay', {
        viewModel: function (params) {
            var component = this;

            component.loading = params.loading;
        },
        template: { element: 'loading-overlay-template' }
    }
}

module.exports = loadingOverlayComponent;
