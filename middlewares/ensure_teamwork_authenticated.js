function ensureTeamworkAuthenticated (req, res, next) {
    if (req.user.teamworkApiKey) {
        return next();
    }

    res.sendStatus(401);
}


module.exports = ensureTeamworkAuthenticated;
