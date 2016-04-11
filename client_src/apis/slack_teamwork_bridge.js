var slackApi = require('./slack_api');
var teamworkUserEditableFields = [
    "first-name",
    "last-name",
    "email-address"
];


function asTeamworkUsers(slackUsers) {
    return slackUsers.map(asTeamworkUser);
}


function asTeamworkUser(slackUser) {
    return {
        "first-name": slackUser.profile.first_name,
        "last-name": slackUser.profile.last_name,
        "email-address": slackUser.profile.email,
        "avatar-url": slackUser.profile.image_512,
        "user-type": 'account',
        "user-name": slackUser.name,
        "password": "",
        "company-id": "",
        "title": "",
        "phone-number-mobile": "",
        "phone-number-office": "",
        "phone-number-office-ext": "",
        "phone-number-fax": "",
        "phone-number-home": "",
        "im-handle": "",
        "im-service": "",
        "dateFormat": "dd/mm/yyyy",
        "sendWelcomeEmail": "no",
        "welcomeEmailMessage": "",
        "receiveDailyReports": "no",
        "autoGiveProjectAccess": "yes",
        "openID": "",
        "notes": "",
        "userLanguage": "EN",
        "administrator": "no",
        "canAddProjects": "yes",
        "timezoneId" : "15",
        "notifyOnTaskComplete":"no",
        "userReceiveNotifyWarnings":"no",
        "notify-on-added-as-follower":"yes",
        "notify-on-status-update":"yes"
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
