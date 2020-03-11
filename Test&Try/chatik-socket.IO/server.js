var server = require('http').createServer();
var port = process.env.PORT || 15000;
var io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.info(`Клієнт приєднався [id=${socket.id}]`);

    socket.on('create', function(room) {
        socket.join(room);
    });

    socket.on("disconnect", () => {
        console.info(`Клієнт від'єднався [id=${socket.id}]`);
    });
});

server.listen(port);