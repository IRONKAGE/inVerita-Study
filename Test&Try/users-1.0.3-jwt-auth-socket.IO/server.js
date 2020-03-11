var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
const mongoose = require('./db/mongoose');

// Очікування підключення ДБ та ініціалізація додатку
mongoose.then(connction => {
    // app.use((req, res, next) => {

    // })
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
    io.use((socket, next) => {
        // use handler to check user
        if(socket.params.psss) {
            next();
        }
        // if user do not have pass => reject him
        throw new Error('do not hsve pass');
        return socket.reject;
    })
    
    io.on('connection', (socket) => {
        if (!loginUser.login(pass)) {
            return;
        }
        socket.on('user.get', (token) => {
            getUser(socket, token);
        });
    
        socket.on('user.create', (data) => {
            console.log('user.create');
            createUser(socket, data);
        });
    
        socket.on('user.login', (data) => {
            authenticateUser(socket, data);
        });
    
        socket.on('user.logout', (token) => {
            delete userSessions[token];
        });
    });
})