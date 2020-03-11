var app = require('express')();
var http = require('http').Server(app); //http server
//initialize a new instance of socket.io by passing http server
var io = require('socket.io')(http);
var users = []; //List of online users
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
    console.log('user: '+socket.username + ' logged out.');
    var date = new Date();
    io.emit('info message', {timestamp: date.toUTCString(), user: socket.username + ' logged out.'});
    //TO DO: Delete user from list.
    });
});