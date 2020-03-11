// const app = require('express')();
// const server = require('http').createServer(app);
// import io from 'socket.io-client';
// const socket = io('http://localhost');

// const io = require('socket.io')(server);
// io.on('connection', () => { 
//     console.log('Користувач приєднався');
//     socket.emit('request', /* … */);
//     io.emit('broadcast', /* … */);
//     socket.on('reply', () => { /* … */ });
    // socket.on('disconnect', () => {
    //     if (addedUser) {
    //         --numUsers;
    //         socket.broadcast.emit('user left', {
    //             username: socket.username,
    //             numUsers: numUsers
    //         });
    //     }
    //     console.log('Користувач від\'єднався');
    // });
// });

// server.listen(3000);

// const server = require('http').createServer();
// const io = require('socket.io')(server);
// io.on('connection', client => {
//     client.on('event', data => { /* … */ });
//     client.on('disconnect', () => { /* … */ });
// });
// server.listen(3000);



// const net = require('net');
// var redis = require("redis"),
//     client = redis.createClient();
 
// // if you'd like to select database 3, instead of 0 (default), call
// // client.select(3, function() { /* ... */ });
 
// client.on("error", function (err) {
//     console.log("Error " + err);
// });
 
// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });

// var express = require('express');
// var app = express();
// var path = require('path');
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// var port = process.env.PORT || 15000;

// const io = require('socket.io')({
//     path: '/test',
//     serveClient: true,
// });
// const net = require('net');
// const redis = require('redis');
// const server = net.createServer(socket => {
//     const subscriber = redis.createClient();
//     subscriber.subscribe('main');
//     subscriber.on('message', (channel, message)  =>  {
//         socket.write('Channel ${channel}: ${message}');
//     });

//     const publisher = redis.createClient();
//     socket.on('data', data  =>  {
//         publisher.publish('main', data);
//     });

//     socket.on('end', () => {
//         subscriber.unsubscribe('main');
//         subscriber.end(true);
//         publisher.end(true);
//     });
// });

// server.listen(3000);




// // var express = require('express'), routes = require('./routes'), http = require('http');
// // var app = express();
// // var server = app.listen(3000);
// // var io = require('socket.io').listen(server); // this tells socket.io to use our express server
// // app.configure(function(){
// // app.set('views', __dirname + '/views');
// // app.set('view engine', 'jade');
// // app.use(express.favicon());
// // app.use(express.logger('dev'));
// // app.use(express.static(__dirname + '/public'));
// // app.use(express.bodyParser());
// // app.use(express.methodOverride());
// // app.use(app.router);
// // });
// // app.configure('development', function(){
// // app.use(express.errorHandler());
// // });
// // app.get('/', routes.index);
// // console.log("Express server listening on port 3000");




// // wss.on('connection', ws => {
// //     console.log('Client connected');
// //     ws.on('message', msg => {                    
// //         console.log(`Message: ${msg}`);
// //         broadcast(msg);
// //     });
// // });
// // function broadcast(msg) {
// //     wss.clients.forEach(client => {
// //         client.send(msg);
// //     });
// // }
// // server.listen(process.argv[2] || 8080);


var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 15001;

var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){console.log('Користувач приєднався');});
socket.on('event', function(data){console.log('Користувач приєднався');});
socket.on('disconnect', function(){console.log('Користувач приєднався');});

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, '/')));

var numUsers = 0;

io.on('connection', (socket) => {
    var addedUser = false;
    console.log('Користувач приєднався');

    socket.on('message', (data) => {
        socket.broadcast.emit('message', {
            username: socket.username,
            message: data
        });
        console.log('Повідомлення надіслано');
    });

    socket.on('add user', (username) => {
        if (addedUser) return;
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
        console.log('Створено Нік');
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
        console.log('Текст друкується');
    });

    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
        console.log('Текст не друкується');
    });

    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
        console.log('Користувач від\'єднався');
    });
});

// // sassesible for user
// // app.use(express.static(path.join(__dirname, 'public')));

// // app.get('/temp', (req, res) => {
// //     res.render('./public/index.html');
// // })

// // curl --noproxy localhost, -X POST --data "data=testControl,loadModels,start,"  http://localhost:15000

//     // if (process.argv[2] && process.argv[3]) {
//     //     console.log('sending ' + process.argv[2] + ': ' + process.argv[3]);
//     //     socket.emit(process.argv[2], process.argv[3]);
//     //     setTimeout(() => {
//     //         process.exit(0);  
//     //     }, someDelay);
//     // } else {
//     //     console.log('usage: ./client.js <event> <data>');
//     //     process.exit(1);
//     // }

//     socket.on('message', (data) => {
//         socket.broadcast.emit('message', {
//             username: socket.username,
//             message: data
//         });
//         console.log('Повідомлення надіслано');
//     });

//     socket.on('add user', (username) => {
//         if (addedUser) return;
//         socket.username = username;
//         ++numUsers;
//         addedUser = true;
//         socket.emit('login', {
//             numUsers: numUsers
//         });
//         socket.broadcast.emit('user joined', {
//             username: socket.username,
//             numUsers: numUsers
//         });
//         console.log('Створено Нік');
//     });

//     socket.on('typing', () => {
//         socket.broadcast.emit('typing', {
//             username: socket.username
//         });
//         console.log('Текст друкується');
//     });

//     socket.on('stop typing', () => {
//         socket.broadcast.emit('stop typing', {
//             username: socket.username
//         });
//         console.log('Текст не друкується');
//     });

//     socket.on('disconnect', () => {
//         if (addedUser) {
//             --numUsers;
//             socket.broadcast.emit('user left', {
//                 username: socket.username,
//                 numUsers: numUsers
//             });
//         }
//         console.log('Користувач від\'єднався');
//     });
// });



// // // var app = require('express')();
// // // var server = require('http').createServer(app);
// // // var io = require('socket.io')();
// // // io.serveClient(false);
// // // io.attach(http);

// // // var io = require('socket.io')(server, {
// // //     path: '/test',
// // //     serveClient: false,
// // //     pingInterval: 10000,
// // //     pingTimeout: 5000,
// // //     cookie: false
// // // });

// // // io.attach(server, {
// // //     pingInterval: 10000,
// // //     pingTimeout: 5000,
// // //     cookie: false
// // // });

// // // io.sockets.emit('hi', 'everyone');

// // // io.origins((origin, callback) => {
// // //     if (origin !== 'https://foo.example.com') {
// // //         return callback('origin not allowed', false);
// // //     }
// // //     callback(null, true);
// // // });

// // // server.listen(3000, function(){
// // //     console.log('listening on *:3000');
// // // });

// // // app.get('/', function(req, res){
// // //     res.sendFile(__dirname + `/index.html`);
// // // });

// // // io.on('connection', function(socket){
// // //     socket.send('Hello world');

// // //     console.log('a user connected');
// // //     socket.on('disconnect', function(){
// // //         console.log('user disconnected');
// // //     });

// // //     socket.on('chat message', function(msg){
// // //         console.log('message: ' + msg);
// // //     });
// // // });

