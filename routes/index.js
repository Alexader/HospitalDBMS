var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var Patient = require('../models/Patient');
var Doctor = require('../models/Doctor');
var Admin = require('../models/Admin');

//check if user is logged in


/* GET home page. */
router.get('/', function (req, res, next) {
  // checkLogin(req, res, next);
  return res.redirect('/register');
});
router.get('/user', function (req, res, next) {
  res.render('home', {
    user: 'tyx',
    postion: 'home',
    subposition: 'user'
    //here to go
  });
});

router.post('/search', function (req, res, next) {
  res.render('searchPage', { title: 'Express' });
})

router.route('/login')
  .get(function (req, res, next) {
    res.render('login', { title: 'Express' })
  })

  .post(function (req, res, next) {
    var email = req.body.email;
    var option = req.body.gridRadios;
    var UserType;
    switch (option) {
      case "patient":
        UserType = Patient;
        break;
      case "doctor":
        UserType = Doctor;
        break;
      case "admin":
        UserType = Admin;
    }
    UserType.findOne({ email: email }, function (err, user) {
      if (err) {
        console.log("用户不存在，请重新登录");
        redirect("/login");
      } else if (user.password != req.body.password) {
        console.log("密码输入错误");
        res.redirect("/login");
      } else {
        console.log("登录成功");
        res.location("/user")
        res.render('home', {
          user: user.name,
          postion: 'home',
          subPosition: 'user'
        })
      }
    })

  })

router.route('/register')
  .get(function (req, res, next) {
    res.render('register', {
      message: res.locals.message,
    });
  })

  .post(function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var password_re = req.body['password-repeat'];
    if (password != password_re) {
      console.log("password not the same");
      res.redirect('/register');
    }

    // check what user type
    var option = req.body.gridRadios;
    var UserType;
    switch (option) {
      case "patient":
        UserType = Patient;
        break;
      case "doctor":
        UserType = Doctor;
        break;
      case "admin":
        UserType = Admin;
    }
    var user = {
      name: name,
      password: password,
      id: req.body.id,
      email: req.body.email,
    };
    var newUser = new UserType(user);
    newUser.save(function (err, user) {
      if (err) console.error(err);
      else {
        console.log("登录成功");
        if (req.autoLogin = 'true') {
          req.session.user = { 'userName': req.body.name };
          req.session.autoLogin = true;
        }
        res.redirect('/user');
      }
    });

  });
module.exports = router;
