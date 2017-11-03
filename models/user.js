var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var options = {native_parser:true};

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
  this.id = user.id;
  user.type = user.type;
};

module.exports = User;

var insertData = function(db, data, callback) {
  db.collection('users').insertOne(data, function(err, result) {
    assert.equal(err, nul);
    console.log('Insertion successfully');
    callback();
  });
};
//存储用户信息
User.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var user = {
      name: this.name,
      password: this.password,
      email: this.email,
      id: this.id,
      type: this.type,
  };
  //打开数据库
  MongoClient.connect(url, options, function(err, db) {
    assert.equal(err, null);
    //insert info of user
    var user =  db.collection('users').find({name: user.name}).explain();
    if(user===null){
      insertData(db, user, function() {
        callback();
        db.close();
      });
    } else {
      console.log('user already exist');
    }
  })
};
//helper function for get user
var getInfo = function(db, name, callback) {
  var user = db.collection('users').find({name: name}).explain();
  //if there is no user it will return null
  callback(user);
}
//读取用户信息
User.get = function(name, callback) {
  MongoClient.connect(url, options, function(err, db) {
    assert.equal(err, null);
    getInfo(db, name, callback);
  })
};