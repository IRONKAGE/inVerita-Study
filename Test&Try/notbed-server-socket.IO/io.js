var socket = require('socket.io');

var messages = [];
var ofertas= [];

var getUser = require('./lib/authComp'),
    loginUser = require('./lib/authComp'),
    createUser = require('./lib/authComp'),
    authenticateUser = require('./lib/authComp');

global.userSessions={};

function startConnection(server){
  var io = socket(server);

  io.on('connection', function(socket){
    console.log('New connection to socket');
    //socket.emit('messages', messages);

    //Get del usuario autenticado
    socket.on('user.get', function(token){
      console.log('llego1');
      getUser(socket, token);
    });

    //Nuevo usuario
    socket.on('user.create', function(data){
      console.log('user.create');
      createUser(socket, data);
    });

    //login
    socket.on('user.login', function(data){
      authenticateUser(socket, data);
      
    });

    //Logout
    socket.on('user.logout', function(token){
      delete userSessions[token];
    });

  });
}
module.exports.startConnection = startConnection;
