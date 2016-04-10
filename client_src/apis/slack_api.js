var $ = require('jquery');

function fetchUsers() {
    return $.ajax({
        method: 'get',
        url: '/api/slack/users',
        dataType: 'json'
    });
}

module.exports = {
    fetchUsers: fetchUsers
};
