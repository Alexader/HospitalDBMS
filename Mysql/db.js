var mysql = require('mysql');

// connect with mysql
var connectionPool = mysql.createPool({
  host : '127.0.0.1',
  user : 'Alex',
  password : '36019970327tyx',
  connectionLimit: 10,
  debug: false,
  acquireTimeout: 5000,
  database: 'mydb',
  multipleStatements: true,
});

// connect to the MySQL server
connectionPool.getConnection(function(err, connection) {
  connection.query("CREATE DATABASE IF NOT EXISTS mydb", function(err) {
    if(err) return console.log("error: "+ err);
    console.log("connect success");
    connection.release();
  })
})

module.exports = connectionPool;