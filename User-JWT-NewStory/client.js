const io = require("socket.io-client");
clientIO = io.connect("http://localhost:5000");

//Отримання даних із сервера
console.log(`Клієнт запущено`);
clientIO.on("user", (msg) => console.info(msg));