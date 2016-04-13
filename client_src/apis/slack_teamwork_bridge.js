var timezonesIds = require('./teamwork_timezones_ids');
var slackApi = require('./slack_api');
var teamworkUserEditableFields = [
    "first-name",
    "last-name",
    "email-address"
];


function asTeamworkUsers(slackUsers) {
    return slackUsers.map(asTeamworkUser);
}


// This function is expected to return undefined if no timezones were found
function computeTimezoneFromSlackUser(slackUser) {
    if (slackUser.tz) {
        return timezonesIds[slackUser.tz.split('/')[1]];
    }

}


function asTeamworkUser(slackUser) {
    return {
        "first-name": slackUser.profile.first_name,
        "last-name": slackUser.profile.last_name,
        "email-address": slackUser.profile.email,
        "avatar-url": slackUser.profile.image_512,
        "user-type": 'account',
        "user-name": slackUser.name,
        "timezoneId" : computeTimezoneFromSlackUser(slackUser)
    }
};


function fetchTeamworkableUsers() {
    return slackApi.fetchUsers()
                   .then(asTeamworkUsers);
}


module.exports = {
    fetchTeamworkableUsers: fetchTeamworkableUsers,
    teamworkUserEditableFields: teamworkUserEditableFields
};
