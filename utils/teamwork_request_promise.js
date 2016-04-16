var twConfig = require('../config').teamworkProjects;
var rp = require('request-promise');

function teamworkRequestPromise (params) {
    params = params || {};
    params.userSite = params.userSite || '';

    var userSite = params.userSite + '/';

    if (userSite.indexOf('http://') !== 0 &&
        userSite.indexOf('https://') !== 0) {
        userSite = 'https://' + userSite;
    }

    return rp({
        uri: userSite + params.apiMethod + '.json',
        method: params.httpMethod || 'GET',
        body: params.data,
        qs: params['?'],
        json: true,
        simple: false,
        headers: {
            'User-Agent': 'Request-Promise',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + new Buffer(params.credentials +  ':xxx').toString('base64')
        }
    });
}

module.exports = teamworkRequestPromise;
