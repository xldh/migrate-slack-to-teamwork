var ko = require('knockout');

function ApiState() {
    this.apiState = {
        loggingIn: ko.observable(false),
        loadingUsers: ko.observable(false),
        importingUsers: ko.observable(false)
    };
}

module.exports = ApiState;
