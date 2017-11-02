var settings = require('../setting');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// MongoClient.connect("mongodb://localhost:27017/test", {native_parser:true}, function(err, db) {
//   assert.equal(null, err);
//   assert.ok(db!=null);
//   db.createCollection('users');
//   db.collection('user').insertOne()
//   var cursor = db.collection('users').find({name: name});
//   cursor.forEach()
//   db.collection('users').update({a:1}, {b:1}, {upsert:true}, function(err, result) {
//     assert.equal(null, err);
//     db.close();
//   });
// });

module.exports = MongoClient;