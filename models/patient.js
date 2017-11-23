var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/test';
mongoose.connect(url);

var patientSchema = mongoose.Schema({
  id: String,
  name: String,
  birthDay: Date,
  sex: String,
  email: String,
  password: String,
})

var Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("connect successfully");
});

