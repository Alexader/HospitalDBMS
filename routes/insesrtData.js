var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var mysql = require('mysql');
var connection = require("../Mysql/db");

router.post('/insert', function(req, res, next) {
  var data = req.body;
  var sql;
  switch(data.userType) {
    case 'patient':
      sql = "UPDATE ?? SET Name=?, Sex=?, Contact=?, Sympton=? WHERE id=?";
      sql = mysql.format(sql,[data.userType, data.name, data.sex, data.contact, data.sympton, data.id]);
      break;
    case 'doctor':
      sql = 'UPDATE ?? SET Name=?, Sex=?, Contact=?, ProffesionalTitle=?,CareerYear=? WHERE ID=?';
      sql = mysql.format(sql, [data.userType, data.name, data.sex, data.contact, data.title, data.career, data.id]);
      break;
    case 'hospital':
      sql = 'UPDATE ?? SET Name=?, Level=?, Contact=?, Address=? WHERE ID=?'
      sql = mysql.format(sql, [data.userType, data.name, data.level, data.contact, data.address]);
      break;
  }
  console.log(data);
  console.log(sql);
  connection.query(sql, function(err, results) {
    if(err) {
      console.log(err);
      console.log(results);
    } else {
      console.log(results);
      //yu have to stringfy your js object before sending it
      var json = JSON.stringify(results);
      console.log(json);
      console.log("update success");
      res.setHeader('Content-Type', 'application/json');
      res.json(json);
    }
    })
})

module.exports = router;