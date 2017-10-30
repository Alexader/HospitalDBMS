var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var User = require('../models/user.js');// model of user data
var check = require('../middlewares/check')

/* GET home page. */
router.get('/', function(req, res, next) {
  //check if user is logged in
  check.checkLogin(req, res, next);
  check.checkNotLogin(req, res, next);
});
router.get('/users', function(req, res, next){
  res.render('home', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.post('/search', function(req, res, next) {
  res.render('searchPage', { title: 'Express' });
})

router.post('/login', function(req, res) {
  var user_phone = req.body.email;
  var password = req.body.password;
})
router.post('/register', function(req, res) {
  var user_name = req.body.name;
  var user_email = req.body.email;
  var user_id_number = req.body.id;
  var user_type = req.body.type;
  var password = req.body.password;
      re_password = req.body.re_password;
  if(password!=re_password){
    req.flash('error', "两次密码不一致");
    return res.redirect('/home');
  }

})
module.exports = router;
