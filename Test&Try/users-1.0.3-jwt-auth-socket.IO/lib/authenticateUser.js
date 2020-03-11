var md5 = require('MD5');
var User = require('./userModel');
var loginUser = require('./loginUser');

module.exports = function authenticateUser(socket, data) {
    data.password = md5(data.password);
    User.findOne(data, null, (error, data) => {
        if (data) {
            return loginUser(socket, data);
        } else {
            return socket.emit('user.login.error', error || {
                message: 'Помилкова пошта або ж пароль'
            });
        }
    });
};