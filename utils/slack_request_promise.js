var slackConfig = require('../config').slack;
var rp = require('request-promise');
var apiMethodHttpMethod  = {
    'import': 'post'
}

function teamworkRequestPromise (params) {
    params = params || {};

    return rp({
        uri: slackConfig.apiUrl + params.apiMethod,
        qs: {
            token: params.credentials
        },
        json: true,
        simple: false,
        headers: {
            'User-Agent': 'Request-Promise'
        }
    });
}

module.exports = teamworkRequestPromise;
