var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  //check if user is logged in
  // check.checkLogin(req, res, next);
  // check.checkNotLogin(req, res, next);
  return res.redirect('/register');
});
router.get('/user', function(req, res, next){
  res.render('home', { 
    title: 'Express', 
    user:  'tyx',
    postion: 'user'
    //here to go
  });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post('/search', function(req, res, next) {
  res.render('searchPage', { title: 'Express' });
})

router.post('/login', function(req, res) {
  var user_phone = req.body.email;
  var password = req.body.password;
})

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', { 
      title: 'Express',
      message: res.locals.message,
    });
  })

  .post(function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var password_re = req.body['password-repeat'];
    if(password!=password_re) {
      console.log("password not the same");
      res.redirect('/register');
    }
    var user = {
      name: name,
      password: password,
      password_re: password_re,
      id: req.body.id,
      email: req.body.email,
    }
    var newUser = new User(user);
    newUser.save(function() {
      console.log('dengluchenggong');
    });
    console.log('zhucechengggong')
    res.redirect('/user');
  });
module.exports = router;
