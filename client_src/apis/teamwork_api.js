var $ = require('jquery');

function login (apiKey) {
    return $.post('/auth/teamwork', {
        apiKey: apiKey
    });
}

function importUsers(users) {

}

module.exports = {
    login: login,
    importUsers: importUsers
};
