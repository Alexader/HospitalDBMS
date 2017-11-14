var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var Patient = require('../models/Patient');
var Doctor = require('../models/Doctor');
var Admin = require('../models/Admin');


/* GET home page. */
router.get('/', function(req, res, next) {
  //check if user is logged in
  // check.checkLogin(req, res, next);
  // check.checkNotLogin(req, res, next);
  return res.redirect('/register');
});
router.get('/user', function(req, res, next){
  res.render('home', { 
    user:  'tyx',
    postion: 'user'
    //here to go
  });
});

router.post('/search', function(req, res, next) {
  res.render('searchPage', { title: 'Express' });
})

router.route('/login')
  .get(function(req, res, next) {
    res.render('login', { title: 'Express' })
  })

  .post(function(req, res, next) {
    var email = req.body.email;
    var option = req.body.gridRadios;
    var UserType;
    switch(option) {
      case "patient":
        UserType = Patient;
      case "doctor" :
        UserType = Doctor;
      case "admin" :
        UserType = Admin;
    }
    UserType.find({email: email}, function(err, user) {
      if(err) {
        console.log("用户不存在，请重新登录");
        redirect("/login");
      } else if(user.password!=req.body.password) {
        console.log("密码输入错误");
      } else {
        redirect("/user");
      }
    })

  })

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', { 
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
    
    // check what user type
    var option = req.body.gridRadios;
    switch(option) {
      case "patient":
        var user = {
          name: name,
          password: password,
          id: req.body.id,
          email: req.body.email,
        };
        var newPatient = new Patient(user);
        newPatient.save(function(err, User) {
          if(err) return console.error(err);
          else{
            console.log('登陆成功');
            res.redirect('/user');
          }
        });
        break;

      case "doctor" : 
        var doctor = {
          name: req.body.name,
          id: req.body.id,
          email: req.body.email,
          password: req.body.password,
        }
        var newDoctor = new Doctor(doctor);
        newDoctor.save(function(err, doctor) {
          if(err) console.error(err);
          else {
            console.log("登录成功");
            res.redirect('/user');
          }
        });
        break;

      case "admin": 
        var admin = {
          name: req.body.name,
          id: req.body.id,
          email: req.body.email,
          password: req.body.password,
        }
        var newAdmin = new Admin(admin);
        newAdmin.save(function(err, admin) {
          if(err) console.error(err);
          else {
            console.log("登录成功");
            res.redirect('/user');
          }
        });
        break;
    }

  });
module.exports = router;
