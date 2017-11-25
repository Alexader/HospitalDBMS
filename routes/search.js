var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var connection = require("../Mysql/db");

router.post('/search', function (req, res, next) {
    req.key = req.body.key;
    req.searchOption = req.body.searchOption;
    var attribute;
    switch(req.searchOption) {
      case 'age':
        attribute = 'Birthday';
        break;
      case 'name':
        attribute = 'Name';
        break;
      case 'id':
        attribute = 'id';
        break;
      default:
        attribute = 'Name';
    }
    if(req.key.length>0) {
      //find related patient
      connection.query('select * from patient where '+ attribute+ ' = '+ connection.escape(req.key), function(err, results, fields) {
        if(err) return console.log(err);
        //check if it is empty result 
        if(results.length>0){
          req.patient = results;
          console.log(results);
        } else {
          req.patient = "没有找到";
        }
        next();
      })
    }
  }, function(req, res, next) {
    //find related doctor
    connection.query('select * from doctor where '+ attribute+ ' = '+ connection.escape(req.key), function(err, results, fields) {
      if(err) return console.log(err);
      //check if it is empty result 
      if(results.length>0) {
        req.doctor = results;
        console.log(results);
      } else {
        req.doctor = "没有找到";
      }
      next();
    })
  }, function(req, res, next) {
    //find related hospital
    connection.query('select * from hospital where '+ attribute+ ' = '+ connection.escape(req.key), function(err, results, fields) {
      if(err) return console.log(err);
      //check if it is empty result
      if(results.length>0) {
        req.hospital = results;
        console.log(results);
      } else {
        req.hospital = "没有找到";
      }
      res.render('searchPage', {
        patient: req.patient,
        hospital: req.hospital,
        doctor: req.doctor,
      })
    })
    });

module.exports = router;