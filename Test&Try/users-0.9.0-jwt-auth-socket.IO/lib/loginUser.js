var crypto = require('crypto');
var getUser = require('./getUser');

module.exports = function loginUser(socket, user) {
    var token = crypto.randomBytes(64).toString('base64');
    userSessions[token] = user;
    return getUser(socket, token);
};