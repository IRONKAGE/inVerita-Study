var server = require('http').createServer();
var port = process.env.PORT || 15000;
var io = require("socket.io")(server);

//Використання socket.IO - на стороні сервера
io.on("connection", (socket) => {
    console.info(`Клієнт приєднався [id=${socket.id}]`);
    socket.broadcast.emit("user", `Клієнт приєднався`)

    socket.on("disconnect", () => {
        console.info(`Клієнт від'єднався [id=${socket.id}]`);
        socket.broadcast.emit("user", `Клієнт від'єднався`)
    });
});

server.listen(port);