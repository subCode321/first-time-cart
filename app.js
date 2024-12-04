var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./seed/product-seeder');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const csrf = require('csurf');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const validator = require('express-validator');


mongoose.connect('mongodb://localhost:27017/shopping')
require('./config/passport')
var app = express();

// view engine setup
app.engine('.hbs', expressHbs.engine({defaultLayout: 'layout', extname : '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: "hehehe", 
  resave: false, 
  saveUninitialized: false
}));


// CSRF protection AFTER session and cookie parser
app.use(csrf({ cookie: true }));

// Add CSRF token to all views
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use((req,res,next) =>{
  res.locals.login = req.isAuthenticated;
  next();

})

app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // Check if it's a CSRF error
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).send('Form tampered with');
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;