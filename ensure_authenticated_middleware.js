function ensureSlackAuthenticated(req, res, next) {
    console.log('isAuthenticated', req.isAuthenticated());

    if (req.isAuthenticated()) { return next(); }
    res.redirect('/auth/slack');
}

module.exports = ensureSlackAuthenticated;
