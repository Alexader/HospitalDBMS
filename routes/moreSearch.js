var express = require('express');
var router = express.Router();
var crypto = require('crypto');//kernel module of node for encryption
var session = require('express-session');
var flash = require('connect-flash');
var connection = require("../Mysql/db");

router.post('/moreSearch', function(req, res, next) {
    var msg = req.body.message;
    if(msg === "message") {
        //render
    }
    })

module.exports = router;
