var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

function proctectRoute(req,res,next){
    // if user exists the token was sent with the request
    if(req.user){
     //if user exists then go to next middleware
        next();
    }
  // token was not sent with request send error to user
    else{
        res.status(500).json({error:'login is required'});
    }
}

var server = require('http').createServer(app);
server.listen(port);
console.log(`Сервер запустився на порті: ` + port)