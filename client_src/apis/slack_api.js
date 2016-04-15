var $ = require('jquery');

function fetchUsers() {
    return $.ajax({
        method: 'get',
        url: '/api/importable-slack-users',
        dataType: 'json'
    });
}

module.exports = {
    fetchUsers: fetchUsers
};
