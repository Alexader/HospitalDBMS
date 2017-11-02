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
router.get('/users', function(req, res, next){
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
router.post('/register', function (req, res) {
  var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];
  //检验用户两次输入的密码是否一致
  if (password_re != password) {
    req.flash('error', '两次输入的密码不一致!');
    return res.redirect('/register');//返回注册页
  }
  //生成密码的 md5 值
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
      name: name,
      password: password,
      email: req.body.email,
      type: req.body.type,
  });
  //检查用户名是否已经存在 
  User.get(newUser.name, function (err, user) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/register');
    }
    if (user) {
      req.flash('error', '用户已存在!');
      return res.redirect('/login');//返回注册页
    }
    //如果不存在则新增用户
    newUser.save(function (err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/register');//注册失败返回主册页
      }
      req.session.user = user;//用户信息存入 session
      req.flash('success', '注册成功!');
      res.redirect('/users');//注册成功后返回主页
    });
  });
});
module.exports = router;
