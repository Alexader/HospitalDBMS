var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get('/users', function(req, res, next){
  res,render('login');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/logout', function(req, res, next) {
  res.render('logout');
});
router.get('./register', function(req, res, next) {
  res.render('register');
});
router.post('./search/:keyword', function(req, res, next) {
  res.render('searchPage');
})

module.exports = router;
