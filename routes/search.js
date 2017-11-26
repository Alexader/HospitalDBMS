var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var connection = require("../Mysql/db");

router.post('/search', function (req, res, next) {
    req.key = req.body.key;
    req.searchOption = req.body.searchOption;
    //different search mode
    switch(req.searchOption) {
      case 'age':
        req.attribute = 'Birthday';
        //assume you got a string comtains number 
        var now = new Date();
        req.Min = new Date(now.getFullYear() - req.key, 0, 1).toJSON();
        req.Max = new Date(now.getFullYear() - req.key, 11, 31).toJSON();
        req.sql = ' between '+ connection.escape(req.Min) + ' and ' + connection.escape(req.Max);
        break;
      case 'name':
        req.attribute = 'Name';
        req.sql = ' = '+ connection.escape(req.key);
        break;
      case 'id':
        req.attribute = 'id';
        req.sql = ' = '+ connection.escape(req.key);
        break;
      default:
        req.attribute = 'Name';
        req.sql = ' = '+ connection.escape(req.key);
    }
    if(req.key.length>0) {
      //find related patient
      var sql = 'select Name,Sex,date_format(Birthday, "%Y-%m-%d") AS birth,Contact,Sympton from patient where '+ 
        req.attribute + req.sql;
      connection.query(sql, function(err, results, fields) {
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
    var sql = 'select Name,Sex,date_format(Birthday, "%Y-%m-%d") AS birth,Contact,ProffesionalTitle,CareerYear from doctor where '+ 
      req.attribute + req.sql;
    connection.query(sql, function(err, results, fields) {
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
    //hospital don't have attribute `Birthday`
    if(req.attribute==='Birthday') {
      req.hospital = '没有找到';
      res.render('searchPage', {
        patient: req.patient,
        hospital: req.hospital,
        doctor: req.doctor,
      });
    } else{
      var sql = 'select * from hospital where '+ req.attribute+ req.sql;
      connection.query(sql, function(err, results, fields) {
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
    }
    });

module.exports = router;