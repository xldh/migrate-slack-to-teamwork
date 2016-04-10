var url = require('url');
var appConfig = require('./config.json');
var twConfig = appConfig.teamworkProjects;
var slackConfig = appConfig.slack;
var sessionConfig = appConfig.session;
var apiKey = twConfig.apiKey;
var authorization = new Buffer(apiKey +  ':xxx').toString('base64');

var userSite = twConfig.userSite;
var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Base ' + authorization
};
var options = url.parse(userSite);

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var passport = require('passport');
var SlackStrategy = require('passport-slack').Strategy;
var rp = require('request-promise');

options.headers = headers;

app.use(logAccess);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: sessionConfig.secret,
    saveUninitialized: true,
    proxy: true,
    resave: true
}));

app.set('view engine', 'jasmine');
app.set('views', './views');


passport.use(new SlackStrategy({
    clientID: slackConfig.clientId,
    clientSecret: slackConfig.clientSecret,
    callbackURL: slackConfig.callbackUrl,
    scope: 'users:read',
    passReqToCallback: true
}, function(req, accessToken, refreshToken, user, done) {
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    done(null, user);
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.get('/api/slack/users', ensureSlackAuthenticated, function (req, res) {
    var user = req.user;

    rp({
        uri: 'https://slack.com/api/users.list',
        qs: {
            token: user.accessToken
        },
        json: true,
        headers: {
            'User-Agent': 'Request-Promise'
        }
    }).then(function (data) {
        if (data.ok) {
            res.send(data.members);
        } else {
            res.status(500).send({ error: 'Sorry something went wrong!' });
        }
    });
});

app.get('/api/teawmork/authenticate', function () {

});

app.get('/auth/slack', passport.authenticate('slack'));

app.get('/auth/slack/callback', passport.authenticate('slack', {
    successRedirect: '/',
    failureRedirect: '/auth/slack'
}));

app.get('/', ensureSlackAuthenticated, function (req, res) {
    res.render('app.ejs');
});


app.listen(8080);

function ensureSlackAuthenticated(req, res, next) {
    console.log('isAuthenticated', req.isAuthenticated());

    if (req.isAuthenticated()) { return next(); }
    res.redirect('/auth/slack');
}

function logAccess(req, res, next) {
    console.log('Access to', req.url);

    next();
}
