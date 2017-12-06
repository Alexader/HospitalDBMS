var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var connection = require("../Mysql/db");
var search = require('./search');
var regAndlog = require('./regAndlog');
var insertData = require('./insesrtData');
var deleteData = require('./deleteData');

router.route('/login')
.get(regAndlog)
.post(regAndlog);
router.route('/register')
.get(regAndlog)
.post(regAndlog);
router.get('/logout', regAndlog)


//to protect website from unauthenticated user
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}
/**
 * you have to put this route behind `login` route
 * otherwise there will be a redirect loop
 */
router.get('*', function(req, res, next) {
if(req.params === '/'||req.params === '/login') {
  next();
} else {
  isAuthenticated(req, res, next);
}
});
//for dev only
router.get('/test', function(req, res, next) {
  res.render('test');
})


router.post('/user', function(req, res, next) {
  if(req.body.userInfo === 'userInfo') {
    console.log("收到");
    console.log(req.session.user);
  }
  res.render('userInfo', {
    user: req.session.user
  })
});

//search handler middleware
router.post('/search', search);
//insert user data
router.post('/insert', insertData);
router.post('/delete', deleteData);


module.exports = router;
