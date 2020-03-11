var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
const mongoose = require('./db/mongoose');

// wait for DB connection & than initialize the APP
mongoose.then(connction => {
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/index.html');
    });
    
    var server = require('http').createServer(app);
    server.listen(port);
    console.log(`Сервер запустився на порті: ` + port)
    
    var io = require("socket.io")(server);
    
    var getUser = require('./lib/getUser');
    var loginUser = require('./lib/loginUser');
    var createUser = require('./lib/createUser');
    var authenticateUser = require('./lib/authenticateUser');
    
    global.userSessions = {};
    
    io.on('connection', (socket) => {
        socket.on('user.get', (token) => {
            getUser(socket, token);
        });
    
        socket.on('user.create', (data) => {
            console.log('user.create');
            createUser(socket, data);
        });
    
        socket.io('user.login', (data) => {
            authenticateUser(socket, data);
        });
    
        socket.on('user.logout', (token) => {
            delete userSessions[token];
        });
    });
})
