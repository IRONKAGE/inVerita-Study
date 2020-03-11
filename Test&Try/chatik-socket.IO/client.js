const io = require("socket.io-client");
io.connect("http://localhost:15000");
socket.emit('create', 'room1');