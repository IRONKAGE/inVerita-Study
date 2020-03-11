var io = require('socket.io')();
var jwtAuth = require('./lib/index');
var data = require('./config/data');

var Room = require('./models/room');

io.use(jwtAuth.authenticate({
    secret: data.valid_jwt.secret,
    algorithm: 'RS256'
}, function(socket,payload, done) {
    var client_address = socket.handshake.address;
    var token_address = payload.token_address;
    if (!token_address) {
        return done('error happened');
    }
    if (client_address !== token_address) {
        return done(null, false, 'user not exist');
    }
    return done(null, {
        id : data.user.id,
        name: data.user.name,
        email: data.user.email
    });
}));

io.on('connection', function(socket) {

    console.log('Authentication passed!');

    socket.emit('success', {
        message: 'success logged in!',
        user: socket.request.user
    });
});

io.of('/rooms').on('connection', function(socket) {

    console.log('Rooms!');

    socket.on('createRoom', function(title) {
        console.log(title);
        Room.findOne({'title': new RegExp('^' + title + '$', 'i')}, function(err, room){
            if(err) throw err;
            if(room){
                console.log('Room title already exists.');
                socket.emit('updateRoomsList', { error: 'Room title already exists.' });
            } else {
                console.log("Create room!");
                Room.create({
                    title: title
                }, function(err, newRoom){
                    if(err) throw err;
                    socket.emit('updateRoomsList', newRoom);
                    socket.broadcast.emit('updateRoomsList', newRoom);
                });
            }
        });
    });
});

io.of('/chatroom').on('connection', function(socket) {

    console.log('Chatroom!');

    socket.on('join', function(roomId) {
        Room.findById(roomId, function(err, room){
            if(err) throw err;
            if(!room){
                console.log("Room doesnt exist.");
                socket.emit('updateUsersList', { error: 'Room doesnt exist.' });
            } else {
                console.log("Join room!");
                Room.addUser(room, socket, function(err, newRoom){
                    console.log(newRoom);
                    socket.join(newRoom.id);
                    Room.getUsers(newRoom, socket, function(err, users, cuntUserInRoom){
                        if(err) throw err;
                        socket.emit('updateUsersList', users, true);
                        if(cuntUserInRoom === 1){
                            socket.broadcast.to(newRoom.id).emit('updateUsersList', users[users.length - 1]);
                        }
                    });
                });
            }
        });
    });


    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    socket.on('disconnect', function() {

        if(socket.request.session.passport == null){
            return;
        }

        Room.removeUser(socket, function(err, room, userId, cuntUserInRoom){
            if(err) throw err;
            socket.leave(room.id);
            if(cuntUserInRoom === 1){
                socket.broadcast.to(room.id).emit('removeUser', userId);
            }
        });
    });

    socket.on('newMessage', function(roomId, message) {
        socket.broadcast.to(roomId).emit('addMessage', message);
    });

});

io.listen(9000, function () {
    console.log("listening on port: " + 9000);
});