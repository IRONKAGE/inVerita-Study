var io = require("socket.io")();

socket.on('connect', function (socket) {
  socket
    .on('authenticated', function () {
      //do other things
    })
    .emit('authenticate', {token: jwt}); //send the jwt
});


socket.on("unauthorized", function(error, callback) {
    if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
        // redirect user to login page perhaps or execute callback:
        callback();
        console.log("User's token has expired");
    }
});




// const userSchema = new mongoose.Schema({
//     displayName: String,
//     email: {
//       type: String,
//       required: 'Укажите e-mail',
//       unique: 'Такой e-mail уже существует'
//     },
//     passwordHash: String,
//     salt: String,
//   }, {
//     timestamps: true
//   });
  
//   userSchema.virtual('password')
//   .set(function (password) {
//     this._plainPassword = password;
//     if (password) {
//       this.salt = crypto.randomBytes(128).toString('base64');
//       this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
//     } else {
//       this.salt = undefined;
//       this.passwordHash = undefined;
//     }
//   })
  
//   .get(function () {
//     return this._plainPassword;
//   });
  
//   userSchema.methods.checkPassword = function (password) {
//     if (!password) return false;
//     if (!this.passwordHash) return false;
//     return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
//   };
  
//   const User = mongoose.model('User', userSchema);


// var socket = io('http://localhost:15000', {
//     extraHeaders: {
//         'x-auth-token': 'THE_JWT_TOKEN'
//     },
//     transportOptions: {
//         polling: {
//             extraHeaders: {
//                 'x-auth-token': 'THE_JWT_TOKEN'
//             }
//         }
//     },
// });

// var socket = io('http://localhost:15000', {query: 'auth_token=THE_JWT_TOKEN'});
//   // Connection failed
//     socket.on('error', function(err) {
//         throw new Error(err);
//     });
//     // Connection succeeded
//     socket.on('success', function(data) {
//         console.log(data.message);
//         console.log('user info: ' + data.user);
//         console.log('logged in: ' + data.user.logged_in)
// })


// var socket = null;
// function App() {

//     useEffect(() => {
//         async function connect () {
//             socket = io.connect('http://localhost:15000');
//         }
//         connect();
//     }, []);

//     return console.log('Hello');
// }

// export default App;




// const io = require("socket.io-client");
// clientIO = io.connect("http://localhost:15000");

// //Отримання даних із сервера
// clientIO.on("Autorization", (m))
// clientIO.on("user", (msg) => console.info(msg));

// var token = sessionStorage.token;
// var socket = io.connect('http://localhost:15000');
// socket.on('connect', function (socket) {
//     socket
//         .on('authenticated', function () {
//         //do other things
//         })
//         .emit('authenticate', {token: token}); //send the jwt
// });