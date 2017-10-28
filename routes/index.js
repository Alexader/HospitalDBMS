var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var User = require('../models/user.js');// model of user data

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
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
module.exports = router;
