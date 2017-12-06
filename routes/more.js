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
    var sql = "select DoctorNum, MedCodeNum, SurgCodeNum, ExamCodeNum from mydb.treatment where PatientNum=?";
    var sqls =[];
    sqls[0] = "SELECT Name FROM doctor WHERE ID=?";
    sqls[1] = "SELECT * FROM medication WHERE ID=?";
    sqls[2] = "SELECT * FROM surgery WHERE ID=?";
    sqls[3] = "SELECT * FROM examination WHERE ID=?";
    //prepare sql
    sql = mysql.format(sql, [msg.id]);
    index = 0;
    var list = [];
    connection.query(sql, function(err, results) {
        if(err) return console.log('error when querying treatment'+err);
        if(results.length<=0) return;
        // you have to do it async;
        var refers = results[0];
        let queryWork = new Promise((resolve,reject)=>{
            //do all query work asyn
            for(var id in refers) {
                connection.query(sqls[index], [refers[id]], function(err, results) {
                    if(err) return console.log(err);
                    else if(results.length>0) {
                        if(typeof(results[0] != undefined))
                            list[index] = results[0];
                    } else return;
                });
                index++;
            }
        });
        queryWork.then(()=>{
            console.log(list);
            res.json(list);
        });
    });
    
});


module.exports = router;
