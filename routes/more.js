var express = require('express');
var router = express.Router();
var session = require('express-session');
var flash = require('connect-flash');
var mysql = require('mysql');
var connection = require("../Mysql/db");

router.post('/more', function(req, res, next) {
    var msg = req.body;
    switch(msg.userType) {
        case 'patient':
            break;
        case 'doctor':
            break;
    }
    var sql = "select DoctorNum, MedCodeNum, SurgCodeNum, ExamCodeNum from treatment where PatientNum=?";
    //prepare sql
    var sqlcom = "select doctor.Name,\
    medication.Price AS mPrice,medication.Instruction,\
    surgery.Site,surgery.Price AS sPrice,surgery.Time,\
    examination.Price AS ePrice,examination.Title from \
    doctor,medication,surgery,examination where \
    doctor.Id=? and medication.ID=? and surgery.ID=? and examination.ID=?";
    var list;
    sql = mysql.format(sql, [msg.id]);
    connection.query(sql, function(err, results) {
        if(err) return console.log('error when querying treatment'+err);
        if(results.length<=0) return;
        var row = results[0];
        sqlcom = mysql.format(sqlcom, [row['DoctorNum'],row['MedCodeNum'],row['SurgCodeNum'],row['ExamCodeNum']]);
        connection.query(sqlcom, function(err, results) {
            if(err) return console.log(err);
            else if(results.length>0) {
                if(typeof(results[0] != undefined))
                    list = results[0];
                    console.log(list);
                    res.json(list);
                    res.end();
            } else return;
        });
    });
    
});


module.exports = router;
