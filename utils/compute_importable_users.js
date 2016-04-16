function computeImportableUsers(slackUsers, teamworkUsers) {
    // use keys of a hash to simplify existing email addresses search
    var teamworkUsersEmails = teamworkUsers.reduce(function (hashTable, teamworkUser) {
        hashTable[teamworkUser['email-address']] = null;
        return hashTable;
    }, {});

    return slackUsers.filter(function (slackUser) {
        return !(slackUser.profile.email in teamworkUsersEmails);
    });
}


module.exports = computeImportableUsers;
