var $ = require('jquery');

function login (userSite, apiKey) {
    return $.post('/auth/teamwork', {
        userSite: userSite,
        apiKey: apiKey
    });
}

function importUsers(users) {
    return $.post('/api/import', {
        users: users
    });
}


function fetchSiteUrl() {
    return $.get('/api/teamwork-site-url');
}


module.exports = {
    login: login,
    fetchSiteUrl: fetchSiteUrl,
    importUsers: importUsers
};
