const io = require("socket.io-client");
clientIO = io.connect("http://localhost:15000");
clientIO.on("user", (msg) => console.info(msg));
// clientIO.on()
clientIO.on("number", (msg) => console.info(msg));
// clientIO.on("sequenceNumber", (msg) => console.log(msg));
// clientIO.on(console.log(user2.i))
// console.log(i)

// clientIO.on((data) => console.info(data));
// io.emit('broadcast', "http://localhost:15000");


// socket.on('add user', (username) => {
//     if (addedUser) return;
//     socket.username = username;
//     ++numUsers;
//     addedUser = true;
//     socket.emit('login', {
//         numUsers: numUsers
//     });
//     socket.broadcast.emit('user joined', {
//         username: socket.username,
//         numUsers: numUsers
//     });
//     console.log('Створено Нік');
// });