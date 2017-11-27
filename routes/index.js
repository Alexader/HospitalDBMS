var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var connection = require("../Mysql/db");
var search = require('./search');
var regAndlog = require('./regAndlog');


router.route('/login')
.get(regAndlog)
.post(regAndlog);


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
router.all('*', function(req, res, next) {
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

router.route('/register')
.get(regAndlog)
.post(regAndlog);
router.get('/logout', regAndlog)

router.post('/user', function(req, res, next) {
  if(req.body.userInfo === 'userInfo') {
    console.log("收到");
  }
  if(req.user) {
    res.render('userInfo', {
      user: req.user.name,
    })
    
  } else{
    res.render('userInfo', {
      user: {
        name: 'tyx',
      }
    })
  }
});

//search handler middleware
router.post('/search', search);


module.exports = router;
