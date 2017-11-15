var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//parse post body

var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var settings = require('./setting');
var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(flash());

//for connecting database to store session
app.use(session({
  secret: settings.cookieSecret,
  name: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  resave: true,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  res.locals.message = req.flash('message');
  next();
});

//let router to deal with it
app.use('/', index);

// catch 404 and forward to error handler
//every page may have occured error, so in the entry of this project which is app.js in this case
//you can deal with error now and if you don't know how to deal with it, you can pass it to the parameter "next"
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
