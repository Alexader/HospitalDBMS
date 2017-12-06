var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var mysql = require('mysql');
var connection = require("../Mysql/db");

router.post('/delete', function(req, res, next) {
  var data = req.body;
  var sql;
  switch(data.userType) {
    case 'patient':
      break;
    case 'doctor':
      break;
    case 'hospital':
      break;
  }
  sql = "DELETE FROM ?? WHERE ID=?"
  sql = mysql.format(sql, [data.userType, data.id]);
  // console.log(data);
  // console.log(sql);
  connection.query(sql, function(err, results) {
    if(err) console.log('delete failed');
    console.log("delete "+data.userType+data.id);
    res.json({info: "delete sucess"});
  })
})

module.exports = router;
