var ko = require('knockout');

function TeamworkState() {
    this.teamworkLoggedIn = ko.observable(false);
    this.siteUrl = ko.observable(null);
    this.importDone = ko.observable(false);
}

module.exports = TeamworkState;
