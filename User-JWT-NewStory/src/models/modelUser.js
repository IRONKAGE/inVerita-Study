const { Schema, model } = require('mongoose');

var userSchema = Schema({
    userName: String,
    firstName: String,
    lastName: String,
    password: {
        type: String,
        select: false},
    email: String
});

module.exports = model('User', userSchema);