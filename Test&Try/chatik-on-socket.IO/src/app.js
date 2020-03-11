var express = require('express');
var app = express();

// Шляхи
app.get('/', async (request, response) => {
	response.sendFile(__dirname + '/index.html');
});

module.exports = app;