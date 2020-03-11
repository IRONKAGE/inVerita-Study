'use strict';

var userModel = require('../database').models.user;

var create = function (data, callback){
    var newUser = new userModel(data);
    newUser.save(callback);
};

var findOne = function (data, callback){
    userModel.findOne(data, callback);
};

var findById = function (id, callback){
    userModel.findById(id, callback);
};


module.exports = {
    create,
    findOne,
    findById
};