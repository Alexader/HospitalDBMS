var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var connection = require("../Mysql/db");

router.post('/search', function (req, res, next) {
    req.key = req.body.search;
    if(req.key.length>0) {
      //find related patient
      connection.query('select * from patient where Name like ?', [req.key], function(err, results, fields) {
        if(err) return console.log(err);
        //check if it is empty result 
        if(results.length>0){
          req.patient = results[0];
          console.log(results[0]);
        } else {
          req.patient = "没有找到！";
        }
        next();
      })
    }
  }, function(req, res, next) {
    //find related doctor
    connection.query('select * from doctor where Name like ?', [req.key], function(err, results, fields) {
      if(err) return console.log(err);
      //check if it is empty result 
      if(results.length>0) {
        req.doctor = results[0];
        console.log(results[0]);
      } else {
        req.doctor = "没有找到";
      }
      next();
    })
  }, function(req, res, next) {
    //find related hospital
    connection.query('select * from hospital where Name like ?', [req.key], function(err, results, fields) {
      if(err) return console.log(err);
      //check if it is empty result
      if(results.length>0) {
        req.hospital = results[0];
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