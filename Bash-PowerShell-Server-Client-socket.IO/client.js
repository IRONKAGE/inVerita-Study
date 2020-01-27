const io = require("socket.io-client");
clientIO = io.connect("http://localhost:15000");

//Отримання даних із сервера
clientIO.on("user", (msg) => console.info(msg));