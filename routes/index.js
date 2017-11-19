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
  res.render('searchPage', { title: 'Express' });
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
    var query = "SELECT * FROM "+UserType+" WHERE id=?";
    connection.query(query, [user.ID], function(err, result) {
      if(err) return console.log("err occured");
      console.log(result);
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
    //injection proof
    switch(option) {
      case "patient":
        UserType = "patient";
        break;
      case "doctor":
        UserType = "doctor";
        break;
      case "admin":
        UserType = "admin"
    }
    var user = {
      name: name,
      password: password,
      password_re: password_re,
      id: req.body.id,
      email: req.body.email,
    }
    var queryString = 'INSERT INTO ' + UserType+' (ID, Name, Contact) VALUES("'+user.id+'","'+user.name+'","'+user.email+'");'
    connection.query(queryString, function(err, result) {
      if(err) {
        console.error(err);
      }
      console.log(result);
      res.redirect("/user");
    })
  });

module.exports = router;
