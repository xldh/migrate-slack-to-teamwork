var url = require('url');
var appConfig = require('./config.json');
var slackConfig = appConfig.slack;
var sessionConfig = appConfig.session;
var session = require('express-session');
var passport = require('passport');
var SlackStrategy = require('passport-slack').Strategy;
var ensureSlackAuthenticated = require('./middlewares/ensure_slack_authenticated');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');

configureSession();


app.use(logAccess);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'jasmine');
app.set('views', './views');

app.get('/', ensureSlackAuthenticated, function (req, res) {
    res.render('app.ejs');
});

app.use('/auth', authRouter);
app.use('/api', apiRouter);



app.listen(8080);


function logAccess(req, res, next) {
    console.log('Access to', req.url);

    next();
}

function configureSession () {
    app.use(session({
        secret: sessionConfig.secret,
        saveUninitialized: true,
        proxy: true,
        resave: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    setupPassportStrategy();

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
}


function setupPassportStrategy() {
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
}
