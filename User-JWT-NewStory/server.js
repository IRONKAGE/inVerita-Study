var app = require('./src/app');

var port = process.env.PORT || 15000;
var server = require('http').createServer(app);

server.listen(port);
console.log(`Сервер запустився на порті: ` + port);