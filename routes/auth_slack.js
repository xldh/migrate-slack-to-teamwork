var passport = require('passport');
var express = require('express');
var router = express.Router();


router.get('/', passport.authenticate('slack'));
router.get('/callback', passport.authenticate('slack', {
    successRedirect: '/',
    failureRedirect: '/auth/slack'
}));


module.exports = router;
