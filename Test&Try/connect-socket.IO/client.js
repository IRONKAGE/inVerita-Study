const io = require("socket.io-client");
clientIO = io.connect("http://localhost:15000");

clientIO.on("user", (msg) => console.info(msg));