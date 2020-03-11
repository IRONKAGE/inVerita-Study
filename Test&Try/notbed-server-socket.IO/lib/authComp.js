var crypto = require('crypto');
var md5 = require('md5');
var User = require('./userModel.js');

function getUser(socket,token){
    if(!userSessions[token]){
        return socket.emit('user.get.error',{
            message: 'This user is not authenticated'
        });
    }
    return socket.emit('user.get.success',{
        profile: userSessions[token],
        token:token
    });
};

function createUser(socket,data){
    data.password = md5(data.password);

    var user = new User(data);

    user.save().then((data)=>{
        return authenticateUser(socket,data);
    });
};

function authenticateUser(socket,data){
  //Hash the password
    data.password = md5(data.password);

    User.findOne(data,null, (err,data)=>{
        if(data){
            return loginUser(socket, data);
        }
        else{
            return socket.emit('user.login.error', err || {
                message: 'Invalid email or password.'
            });
        }
    });
};

function loginUser(socket,data){
    var token = crypto.randomBytes(64).toString('base64');
    userSessions[token] = data;

    return getUser(socket,data);
};


module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.authenticateUser = authenticateUser;
module.exports.loginUser = loginUser;
