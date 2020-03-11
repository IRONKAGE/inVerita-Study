// just use mongoose as it is 
const { Schema, model } = require('mongoose');

var userSchema = Schema({
    firstName: String,
    lastName: String,
    password: {
        type: String,
        select: false},
    email: String
});

module.exports = model('User', userSchema);