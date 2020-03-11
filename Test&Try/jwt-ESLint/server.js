var express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./src/config/config');
let middleware = require('./src/middleware/middleware');

class HandlerGenerator {
    login (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let mockedUsername = 'admin';
        let mockedPassword = 'password';
        if (username && password) {
            if (username === mockedUsername && password === mockedPassword) {
                let token = jwt.sign({username: username},
                    config.secret,
                    {expiresIn: '24h'}
                );
                res.json({
                    success: true,
                    message: 'Авторизація успішна!',
                    token: token
                });
            } else {
                res.send(403).json({
                    success: false,
                    message: 'Не коректний пароль чи ім\'я користувача'
                });
            }
        } else {
            res.send(400).json({
                success: false,
                message: 'Хибна авторизація =('
            });
        }
      }
      index (req, res) {
          res.json({
              success: true,
              message: 'Головна сторінка'
          });
    }
}

function main () {
    let app = express();
    var port = process.env.PORT || 15000;
    var server = require('http').createServer(app);
    let handlers = new HandlerGenerator();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.post('/login', handlers.login);
    app.get('/', middleware.checkToken, handlers.index);

    server.listen(port);
    console.log(`Сервер запустився на порті: ` + port)
}

main();