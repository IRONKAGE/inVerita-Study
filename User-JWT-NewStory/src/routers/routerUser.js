'use strict';
var routerUser = require('express').Router();
var socketUser = require('../api/lib/user/socketUser');
// var io = require('socket.io')();
// var mongoose = require('mongoose');
// var jose = require('jose');

routerUser.get('/', socketUser, async (request, response, next) => {
    try {
        response.status(200).json({
            message: 'Сторінка користувача'
        });
    } catch (error) {
        response.status(500).send(error);
        console.error(error);
    }
});


// io.on("connection", (socket) => {
//     console.info(`Клієнт приєднався [id=${socket.id}]`);
//     socket.broadcast.emit("user", `Клієнт приєднався`)

//     socket.on("disconnect", () => {
//         console.info(`Клієнт від'єднався [id=${socket.id}]`);
//         socket.broadcast.emit("user", `Клієнт від'єднався`)
//     });

// io.on('connection', function (socket) {
//     console.info(`Клієнт приєднався [id=${socket.id}]`);
//     socket.broadcast.emit("user", `Клієнт приєднався`);
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });

module.exports = routerUser;