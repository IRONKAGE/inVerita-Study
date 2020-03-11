var server = require('http').createServer();
var port = process.env.PORT || 15000;
var io = require("socket.io")(server);

var socketioJwt   = require("socketio-jwt");
 
//// With socket.io < 1.0 ////
io.set('authorization', socketioJwt.authorize({
  secret: 'your secret or public key',
  handshake: true
}));
//////////////////////////////
 
//// With socket.io >= 1.0 ////
io.use(socketioJwt.authorize({
  secret: 'your secret or public key',
  handshake: true
}));
///////////////////////////////
 
io.on('connection', function (socket) {
  // in socket.io < 1.0
  console.log('hello!', socket.handshake.decoded_token.name);
 
  // in socket.io 1.0
  console.log('hello! ', socket.decoded_token.name);
})


// const Koa = require('koa'); // ядро
// const Router = require('koa-router'); // маршрутизация
// const bodyParser = require('koa-bodyparser'); // парсер для POST запросов
// const serve = require('koa-static'); // модуль, который отдает статические файлы типа index.html из заданной директории
// const logger = require('koa-logger'); // опциональный модуль для логов сетевых запросов. Полезен при разработке.

// const app = new Koa();
// const router = new Router();
// app.use(serve('public'));
// app.use(logger());
// app.use(bodyParser());

// const passport = require('koa-passport'); //реализация passport для Koa
// const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
// const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
// const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT

// const jwtsecret = "mysecretkey"; // ключ для подписи JWT
// const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
// const socketioJwt = require('socketio-jwt'); // аутентификация по JWT для socket.io

// const socketIO = require('socket.io');

// const mongoose = require('mongoose'); // стандартная прослойка для работы с MongoDB
// const crypto = require('crypto'); // модуль node.js для выполнения различных шифровальных операций, в т.ч. для создания хэшей.

// mongoose.Promise = Promise; // Просим Mongoose использовать стандартные Промисы
// mongoose.set('debug', true);  // Просим Mongoose писать все запросы к базе в консоль. Удобно для отладки кода
// mongoose.connect('mongodb://localhost/test'); // Подключаемся к базе test на локальной машине. Если базы нет, она будет создана автоматически.



// const userSchema = new mongoose.Schema({
//     displayName: String,
//     email: {
//         type: String,
//         required: 'Укажите e-mail',
//         unique: 'Такой e-mail уже существует'
//     },
//     passwordHash: String,
//     salt: String,
// }, {
//     timestamps: true
// });

// userSchema.virtual('password')
//     .set(function (password) {
//         this._plainPassword = password;
//         if (password) {
//             this.salt = crypto.randomBytes(128).toString('base64');
//             this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
//         } else {
//             this.salt = undefined;
//             this.passwordHash = undefined;
//         }
//     })

//     .get(function () {
//         return this._plainPassword;
//     });

// userSchema.methods.checkPassword = function (password) {
//     if (!password) return false;
//     if (!this.passwordHash) return false;
//     return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
// };

// const User = mongoose.model('User', userSchema);





// passport
//     .use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         session: false
//     },
//     function (email, password, done) {
//         User.findOne({email}, (err, user) => {
//             if (err) {
//                 return done(err);
//             }
//         if (!user || !user.checkPassword(password)) {
//             return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
//         }
//         return done(null, user);
//         });
//     })
// );






// const jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeader(),
//     secretOrKey: jwtsecret
// };

//   passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
//       User.findById(payload.id, (err, user) => {
//         if (err) {
//           return done(err)
//         }
//         if (user) {
//           done(null, user)
//         } else {
//           done(null, false)
//         }
//       })
//     })
//   );





//   router.post('/user', async(ctx, next) => {
//     try {
//       ctx.body = await User.create(ctx.request.body);
//     }
//     catch (err) {
//       ctx.status = 400;
//       ctx.body = err;
//     }
//   });



//   router.post('/login', async(ctx, next) => {
//     await passport.authenticate('local', function (err, user) {
//       if (user == false) {
//         ctx.body = "Login failed";
//       } else {
//         //--payload - информация которую мы храним в токене и можем из него получать
//         const payload = {
//           id: user.id,
//           displayName: user.displayName,
//           email: user.email
//         };
//         const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
        
//         ctx.body = {user: user.displayName, token: 'JWT ' + token};
//       }
//     })(ctx, next);  
//   });







//   router.get('/custom', async(ctx, next) => {
  
//     await passport.authenticate('jwt', function (err, user) {
//       if (user) {
//         ctx.body = "hello " + user.displayName;
//       } else {
//         ctx.body = "No such user";
//         console.log("err", err)
//       }
//     } )(ctx, next)  
//   });



//   let io = socketIO(server);

//   io.on('connection', socketioJwt.authorize({
//     secret: jwtsecret,
//     timeout: 15000
//   })).on('authenticated', function (socket) {
    
//     console.log('Это мое имя из токена: ' + socket.decoded_token.displayName);
    
//     socket.on("clientEvent", (data) => {
//       console.log(data);
//     })
//   });


// app.use(passport.initialize()); // сначала passport
// app.use(router.routes()); // потом маршруты
// const server = app.listen(3000);// запускаем сервер на порту 3000

// var server = require('http').createServer();
// var port = process.env.PORT || 15000;
// var io = require("socket.io")(server);
// var socketioJwt = require('socketio-jwt');

// var io = require('socket.io')();
// var jwtAuth = require('socketio-jwt-auth');

// // using middleware
// io.use(jwtAuth.authenticate({
//   secret: 'Your Secret',    // required, used to verify the token's signature
//   algorithm: 'HS256'        // optional, default to be HS256
// }, function(payload, done) {
//   // done is a callback, you can use it as follows
//     User.findOne({id: payload.sub}, function(err, user) {
//         if (err) {
//             // return error
//             return done(err);
//         }
//         if (!user) {
//         // return fail with an error message
//             return done(null, false, 'user does not exist');
//         }
//         // return success with a user info
//         return done(null, user);
//     });
// }));

// const socketioJwt = require('socketio-jwt');
// const express = require('express');
// const app = express();

// const server = app.listen(15000,
//     console.log(`Server running in ${process.env.NODE_ENV} mode on port ${15000}`)
// );

// const io = require('socket.io')(server);
// io.use(socketioJwt.authorize({
//     secret: '123.123.123',
//     handshake: true
// }));

// io.on('connection', (socket) => {
//     console.log('hello!', socket.decoded_token.name);

//     socket.emit('hello', {message: 'hello world'});

//     socket.on('myevent', myhandler);
// });




// io.sockets
//     .on('connection', socketioJwt.authorize({
//         secret: 'SECRET_KEY',
//         timeout: 15000 // 15 seconds to send the authentication message
//     })).on('authenticated', function(socket) {
//         //this socket is authenticated, we are good to handle more events from it.
//         console.log('hello! ' + socket.decoded_token.name);
//     });


// var server = require('http').createServer();
// var port = process.env.PORT || 15000;
// var io = require("socket.io")(server);

// //Використання socket.IO - на стороні сервера
// io.on("connection", (socket) => {
//     console.info(`Клієнт приєднався [id=${socket.id}]`);
//     socket.broadcast.emit("user", `Клієнт приєднався`)

//     socket.on("disconnect", () => {
//         console.info(`Клієнт від'єднався [id=${socket.id}]`);
//         socket.broadcast.emit("user", `Клієнт від'єднався`)
//     });
// });

server.listen(port);
console.log(`Сервер запустився на порті: ` + port)
