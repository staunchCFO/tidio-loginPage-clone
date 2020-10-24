"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var session = require('express-session');

var mongoose = require('mongoose');

var dotenv = require('dotenv').config();

var passport = require('passport');

var LocalStrategy = require('passport-local');

var helmet = require('helmet');

var uuid = require('uuid');

var color = require('colors');

var MongoDBStore = require('connect-mongodb-session')(session);

var indexRouter = require('./routes/index');

var app = express();
var store = new MongoDBStore({
  uri: process.env.MONGO_DB,
  collection: 'sessions'
}); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
  cookie: {
    maxAge: 864e5
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  store: store,
  saveUninitialized: true,
  unset: 'destroy',
  genid: function genid(req) {
    return uuid.v4();
  }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(helmet());
app.use(express["static"](path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
/**
  Configure passport 
*/

passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
app.use('/', indexRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});
var CONFIG = {
  uri: process.env.MONGO_DB,
  OPTIONS: {
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 10,
    keepAlive: true,
    useUnifiedTopology: true,
    keepAliveInitialDelay: 3e6
  }
};
mongoose.connect(CONFIG.uri, CONFIG.OPTIONS);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.on('open', console.info.bind(console, 'Connection to the database was successful'.cyan.underline)); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;