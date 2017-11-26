var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var connection = require("../Mysql/db");
var search = require('./search');
var regAndlogin = require('./regAndlogin');

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.redirect('/register');
});

//for dev only
router.get('/test', function(req, res, next) {
  res.render('test');
})

router.get('/user', function (req, res, next) {
  res.render('home', {
    // user: 'tyx',
    // postion: 'home',
    // subposition: 'user'
    // //here to go
  });
});
router.post('/user', function(req, res, next) {
  if(req.body.userInfo === 'userInfo') {
    console.log("收到");
  }
  if(req.session.user.length>0) {
    res.render('userInfo', {
      user: req.session.user,
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
// router.post('/moreSearch', moreSearch);

router.route('/login')
  .get(regAndlogin)
  .post(regAndlogin);
router.route('/register')
  .get(regAndlogin)
  .post(regAndlogin);

module.exports = router;
