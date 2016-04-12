var ko = require('knockout');

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

module.exports = makeObservable;
