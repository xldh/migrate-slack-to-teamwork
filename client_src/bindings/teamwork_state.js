var ko = require('knockout');

function TeamworkState() {
    this.teamworkLoggedIn = ko.observable(false)
}

module.exports = TeamworkState;
