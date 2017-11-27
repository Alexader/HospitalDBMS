var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connection = require("../Mysql/db");


//authentication for login strategy
passport.use('local-login', new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  passReqToCallback: true //passback entire req to callback
}, function (req, id, password, done) {
  if (!id || !password) { return done(null, false, req.flash('message', 'All fields are required.')); }
  var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
  connection.query("select * from user where id = ?", [id], function (err, results) {
    console.log(err); console.log(results);
    //find error and inform user
    if (err) return done(req.flash('message', err));
    //invalid input
    if (!results.length) {
      return done(null, false, req.flash('message', 'no user found.'));
    }
    salt = salt + password;
    //encript your password
    var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
    var dbPassword = results[0].password;
    if (!(dbPassword === encPassword)) {
      return done(null, false, req.flash('message', 'wrong password.'));
    }
    return done(null, results[0]);
  });

}
));

//authentication for register strategy
passport.use('local-register', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true,
}, function (req, name, password, done) {
  if (!name || !password) { return done(null, false, req.flash('message', 'All fields are required.')); }
  var UserType;
  var type = req.body.type;
  switch (type) {
    case "patient":
      UserType = "normal";
      break;
    case "doctor":
      UserType = "normal";
      break;
    case "admin":
      UserType = "admin";
  }
  var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
  salt = salt + password;
  var hashPassword = crypto.createHash('sha1').update(salt).digest('hex');
  //construct user model for insertion
  var newUserMysql = {
    name: name,
    id: req.body.id,
    password: hashPassword,
    type: type,
    email: req.body.email,
  }
  if (UserType === 'admin') {
    connection.query('SELECT * FROM adminKey WHERE invitation = ?', [req.body.id], function (err, results) {
      console.log(err); console.log(results);
      //find error and inform user
      if (err) return done(req.flash('message', err));
      //not allowed by admin
      if (results.length) {
        return done(null, false, req.flash('message', 'you are not allowed to register as admin.'));
      } else {
        connection.query('INSERT INTO user (id, name, password, priority, email) VALUES(?,?,?,?,?)',
          [newUserMysql.id, newUserMysql.name, newUserMysql.password,
          newUserMysql.type, newUserMysql.email], function (err, result) {
            if (err) return console.log(err);
            console.log(result);
            //invitation confirmed   
            return done(null, results[0]);
          });
      }
    })
  } else {
    connection.query("select * from user where id = ?", [req.body.id], function (err, results) {
      console.log(err); console.log(results);
      //find error and inform user
      if (err) return done(req.flash('message', err));
      //already registerd
      if (results.length) {
        return done(null, false, req.flash('message', 'you already registerd.'));
      } else {
        //add user
        connection.query('INSERT INTO user (id, name, password, priority, email) VALUES(?,?,?,?,?)',
          [newUserMysql.id, newUserMysql.name, newUserMysql.password,
          newUserMysql.type, newUserMysql.email], function (err, results) {
            if (err) return console.log(err);
            console.log(results);
            return done(null, newUserMysql);
          });
      }
    });
  }
}));

//this will invoke when we have authenticated user and pass `user` to done(err, user,..)
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
//this will invoke when you use passport.session()
passport.deserializeUser(function (id, done) {
  connection.query("select * from user where id = " + id, function (err, rows) {
    done(err, rows[0]);
  });
});

//in my case, `done` function above in `LocalStrategy` will be my function(req, res, info) written below
router.post("/login", passport.authenticate('local-login', {
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res, info) {
  res.render('home', {
    'message': req.flash('message'),
    'user': req.user,
  });
});

router.post('/register', passport.authenticate('local-register', {
  failureRedirect: '/register',
  failureFlash: true,
}), function(req, res, info) {
  res.render('home', {
    'message': req.flash('message'),
    'user': req.user,
  })
}
)

//login handler
router.route('/login')
  .get(function (req, res, next) {
    res.render('login', { title: 'Express' })
  })

//register handler
router.route('/register')
  .get(function (req, res, next) {
    res.render('register', {
      title: "Express",
    });
  })

router.get('/logout', function(req, res) {
  req.session.destroy();
  req.logout();
  res.redirect('/login');
})
module.exports = router;