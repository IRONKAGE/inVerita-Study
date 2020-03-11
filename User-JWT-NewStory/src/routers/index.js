'use strict';
var index = require('express').Router();




index.get('/', async (request, response, next) => {
    // return socketIO;
    response.status(200).json({
        message: 'Головна сторінка сайту'
    });
    next();
});

module.exports = index;