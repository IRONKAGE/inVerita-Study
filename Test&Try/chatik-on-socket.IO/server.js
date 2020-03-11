var app = require('./src/app');
var port = process.env.PORT || 15000;
var server = require('http').createServer(app)
var io = require('socket.io')(server);

// Логін
var usernames = {};

// Кімнати
var rooms = ['Дискусія', 'Знайомство', 'Оголошення'];

io.sockets.on("connection", (socket) => {
	
	// Робота з кімнатами
	socket.on('adduser', (username) => {
		socket.username = username;
		socket.room = 'Дискусія';
		usernames[username] = username;
		socket.join('Дискусія');
		socket.emit('updatechat', 'Сервер:', 'Ви під\'єднались до кімнати Дискусія');
		socket.broadcast.to('Дискусія').emit('updatechat', 'SERVER', username + ' приєднався до цієї кімнати');
		socket.emit('updaterooms', rooms, 'Дискусія');
	});
	
	// Робота з повідомленнями
	socket.on('sendchat', (data) => {
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});
	
	// Зміна кімнати
	socket.on('switchRoom', (newroom) => {
		socket.leave(socket.room);
		socket.join(newroom);
		socket.emit('updatechat', 'Сервер:', 'Ви під\'єднались до нової кімнати '+ newroom);
		socket.broadcast.to(socket.room).emit('updatechat', 'Сервер: ', socket.username+' покинув цю кімнату =(');
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'Сервер: ', socket.username+' приєднався до цієї кімнати =)');
		socket.emit('updaterooms', rooms, newroom);
	});
	
	// Реакція на відключення чи зміну кімнати
	socket.on('disconnect', function(){
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat', 'Сервер: ', socket.username + ' від\'єднався');
		socket.leave(socket.room);
	});
});

server.listen(port);