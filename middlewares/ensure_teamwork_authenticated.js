function ensureTeamworkAuthenticated (req, res, next) {
    if (req.user.teamworkApiKey) {
        return next();
    }

    console.log('Ensure teamwork authenticated failed');

    res.sendStatus(401);
}


module.exports = ensureTeamworkAuthenticated;
