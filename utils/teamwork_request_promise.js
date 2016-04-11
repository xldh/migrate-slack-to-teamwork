var twConfig = require('../config').teamworkProjects;
var rp = require('request-promise');

function teamworkRequestPromise (params) {
    params = params || {};

    console.log('Hitting teamwork with', params);

    return rp({
        uri: twConfig.userSite + params.apiMethod + '.json',
        method: params.httpMethod || 'GET',
        json: true,
        headers: {
            'User-Agent': 'Request-Promise',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + new Buffer(params.credentials +  ':xxx').toString('base64')
        }
    });
}

module.exports = teamworkRequestPromise;
