var express = require('express');
var app = express();

var port = process.env.PORT || 15000;
var server = require('http').createServer(app);

var io = require('socket.io')(server);

io.on("connection", (socket) => {
    console.info(`Клієнт приєднався [id=${socket.id}]`);
    socket.broadcast.emit("user", `Клієнт приєднався`)

    socket.on("disconnect", () => {
        console.info(`Клієнт від'єднався [id=${socket.id}]`);
        socket.broadcast.emit("user", `Клієнт від'єднався`)
    });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

server.listen(port);
console.log(`Сервер запустився на порті: ` + port)