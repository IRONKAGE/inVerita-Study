const io = require('socket.io')(); // для автоматичного перезавантаження сторінки
                                  // слід перемістити в тіло index.get

const socketUser = async (request, response, next) => {
    io.on("connection", (socket) => {
        console.info(`Клієнт приєднався [id=${socket.id}]`);
        socket.broadcast.emit("user", `Клієнт приєднався`)

        socket.on("disconnect", () => {
            console.info(`Клієнт від'єднався [id=${socket.id}]`);
            socket.broadcast.emit("user", `Клієнт від'єднався`)
        });
    });
    io.listen(5000);
    next();
}

module.exports = socketUser;