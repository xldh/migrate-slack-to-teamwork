var express = require('express');
var router = express.Router();
var ensureSlackAuthenticated = require('../ensure_authenticated_middleware');

router.use(ensureSlackAuthenticated);
router.use(ensureTeamworkAuthenticated);
router.post('/import',  function (req, res) {

});


function ensureTeamworkAuthenticated (req, res, next) {
    if (req.user.teamworkApiKey) {
        return next();
    }

    res.sendStatus(401);
}

module.exports = router;
