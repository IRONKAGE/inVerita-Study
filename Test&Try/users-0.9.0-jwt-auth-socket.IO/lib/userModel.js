var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/authuser');

var userSchema = db.Schema({
    firstName: String,
    lastName: String,
    password: {
        type: String,
        select: false},
    email: String
});

module.exports = db.model('User', userSchema);