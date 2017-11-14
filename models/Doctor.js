var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/test';
mongoose.createConnection(url);

var doctorSchema = mongoose.Schema({
  id: String,//a string hospital give,accquired
  name: String,
  birthDay: Date,
  sex: String,
  title: String,
  email: String,
  password: String,//accquired
})

var Doctor = mongoose.model("doctor", doctorSchema);

module.exports = Doctor;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("doctor connect successfully");
});