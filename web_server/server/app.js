var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var auth = require('./routes/auth');
var index = require('./routes/index');
var news = require('./routes/news');
var	cors	=	require('cors');
var app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect MongoDB and load UserModel
var config = require('./config/config.json');
require('./models/main.js').connect(config.mongoDbUri);

// load passport strategies
var passport = require('passport');
app.use(passport.initialize());
var localSignupStrategy = require('./passport/signup_passport');
var localLoginStrategy = require('./passport/login_passport');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// TODO: remove this after development is done.
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/static',
    express.static(path.join(__dirname, '../client/build/static')));

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth_checker');
app.use('/news', authCheckMiddleware);

app.use('/', index);
app.use('/auth', auth);
app.use('/news', news);

// catch 404.
app.use(function(req, res, next) {
  res.status(404);
});

module.exports = app;
