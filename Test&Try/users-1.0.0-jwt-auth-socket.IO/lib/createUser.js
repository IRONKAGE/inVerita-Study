var md5 = require('MD5');
var User = require('./userModel');
var loginUser = require('./loginUser');

module.exports = function createUser(socket, data) {
    data.password = md5(data.password);
    var user = new User(data);
    user.save().then((data) => {
        return loginUser(socket, data);
    });
};