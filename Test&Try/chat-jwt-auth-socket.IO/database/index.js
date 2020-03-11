'use strict';

var config 		= require('../config/config');
var Mongoose 	= require('mongoose');

var dbURI = "mongodb://" +
    encodeURIComponent(config.db.username) + ":" +
    encodeURIComponent(config.db.password) + "@" +
    config.db.host + ":" +
    config.db.port + "/" +
    config.db.name;
Mongoose.connect(dbURI, { useNewUrlParser: true });


Mongoose.connection.on('error', function(err) {
    if(err) throw err;
});

Mongoose.Promise = global.Promise;

module.exports = { Mongoose,
    models: {
        user: require('./schemas/user.js'),
        room: require('./schemas/room.js')
    }
};