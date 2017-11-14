var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/test';
mongoose.connect(url);

var UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  id: String,
})

var User = mongoose.model("user", UserSchema);

module.exports = User;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("connect successfully");
});

