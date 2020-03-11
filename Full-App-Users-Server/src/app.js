var express = require('express');
var app = express();

const index = require('./routers/index');
const routerUser = require('./routers/routerUser');

app.use('/', index);
app.use('/user', routerUser);

module.exports = app;