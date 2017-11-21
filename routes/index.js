var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var connection = require("../Mysql/db");

/* GET home page. */
router.get('/', function(req, res, next) {
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
  var key = req.body.search;
  if(key.length>0) {

  }
})

router.route('/login')
  .get(function (req, res, next) {
    res.render('login', { title: 'Express' })
  })

  .post(function (req, res, next) {
    var option = req.body.gridRadios;
    var UserType;
    switch (option) {
      case "patient":
        UserType = "patient";
        break;
      case "doctor":
        UserType = "doctor";
        break;
      case "admin":
        UserType = "admin";
    }
    var user = {
      ID: req.body.id,
      email: req.body.email,
    }
    //check if user exsit
    var checkExist = "SELECT id FROM user WHERE id=?";
    var checkPassword = "SELECT password FROM user WHERE id=?"
    connection.query(checkExist, [user.ID], function(err, result) {
      if(err) return console.log("err occured");
      console.log(result);
      if(result.length>0) {
        //check if password is correct
        connection.query(checkPassword, [user.password], function(err, result) {
          if(err) return console.log("error: query failed");
          if(result.password === user.password) {
            if (req.autoLogin = 'true') {
              req.session.user = result;
              req.session.autoLogin = true;
            } else {
              req.session.autoLogin = false;
            }
            res.redirect('/user');
            console.log("log in successfully");
          } else{
            console.log("password not correct");
            res.redirect('/login');
          }
        });
      }
    })
  })

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {
      title: "Express",
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
    var option = req.body.gridRadios;
    var UserType;
    //when it is doctor or patient register, the id colume is id card number
    //case it is admin registering, id attribute is invitation code 
    var user = {
      name: name,
      password: password,
      id: req.body.id,
      email: req.body.email,
    }
    //injection proof
    switch(option) {
      case "admin":
        UserType = 'admin';
        break;
      case "patient":
      case "doctor":
        UserType = 'normal';
        break;
    }
    //check if invitation code exist
    user.userType = UserType;
    if(user.userType === 'admin') {
      connection.query('SELECT * FROM adminKey WHERE invitation = ' + user.id, function(err, result) {
        if(err) return console.log(err);
        console.log(result+'we');
        if(result.length>0) {
          console.log('有权限');
          //if got right invitation code, add user and into user page
          connection.query('INSERT INTO user (id, name, password, priority, email) VALUES(?,?,?,?,?)',
          [user.id, user.name, user.password, user.userType, user.email], function(err, result) {
            if(err) return console.log(err);
            console.log(result + 'ree');
            //user name stored in session
            req.session.user = result;
            res.redirect('/user');
          });
        } else {
          console.log("邀请码不存在，请确认")
          res.redirect('/register');
        }
      })
    } else {
      connection.query('SELECT * FROM user WHERE id = ' + user.id, function(err, result) {
        if(err) return console.log(err);
        console.log(result+'we');
        //user already exist
        if(result.length>0) {
          console.log('用户已存在');
          res.redirect('/register')
        } else {// add new user
          connection.query('INSERT INTO user (id, name, password, priority, email) VALUES(?,?,?,?,?)',
          [user.id, user.name, user.password, user.userType, user.email], function(err, result) {
            if(err) return console.log(err);
            console.log(result + 'ree');
            //user name stored in session
            req.session.user = user;
            res.redirect('/user');
          });
        }
      });
    }
  });

module.exports = router;
