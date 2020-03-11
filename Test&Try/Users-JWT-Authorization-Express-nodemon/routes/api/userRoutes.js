var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var userModel = require('../../models/userModel');

//Підключення БД
connectMongoDB = require('../../db/connectMongo');
useMongo = require('../../models/userMongoModel');

module.exports = (app) => {
    app.post('/user/login', async (request, response, next) => {
        
        const { body } = request;
        const { username } = body;
        const { password } = body;

        try {
            // Перевірка на валідність
            if(username === userModel.username && password === userModel.password) { 
                // Якщо все добре - то добре
                jwt.sign({userModel}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                    if(err) { console.log(err) }    
                    response.send(token);
                });
            }
        } catch (error) {
            response.status(500).send(error);
            console.error(error);
        }
    })

    app.post('/user/mongologin', async (request, response, next) => {
        
        const { body } = request;
        const { username } = body;
        const { password } = body;

        try {
            // Перевірка на валідність
            if(username === useMongo.username && password === useMongo.password) { 
                // Якщо все добре - то добре
                jwt.sign({useMongo}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                    if(err) { console.log(err) }    
                    response.send(token);
                });
            }
        } catch (error) {
            response.status(500).send(error);
            console.error(error);
        }
    })

    app.get('/user/data', checkToken, (request, response) => {
        //Якщо є користувач то йому генерується токен
        jwt.verify(request.token, 'privatekey', (err, authorizedData) => {
            if(err){
                console.log('Помилка: не вдалося встановити з\'єднання');
                response.sendStatus(403);
            } else {
                response.json(
                    {message: 'Успішна авторизація'},
                    authorizedData()
                )
                console.log('Успіх: успішна авторизація');
            }
        })
    });

    app.post('/user/data', async (request, response, next) => {
        try {
            const app = await new useMongo({
                                    _id: new mongoose.Types.ObjectId(),
                                    username: request.body.username,
                                    password: request.body.password,
                                    firstName: request.body.firstName,
                                    lastName: request.body.lastName,
                                    dob: request.body.dob,
                                    email: request.body.email,
                                    address: {
                                        street: request.body.street,
                                        city: request.body.city,
                                        postCode: request.body.postCode
                                    }
                                })
                                .save()
                                .then(result => {
                                    console.log(result);
                                    response.status(201).json({
                                        message: "POST запит",
                                        createdCrudUser: result
                                    });
                                })
            response.json(app);
        } catch(error) {
            response.status(500).send(error);
            console.error(error);
        }
    });
}

const checkToken = (request, response, next) => {
    const header = request.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        request.token = token;
        next();
    } else {
        response.sendStatus(403)
    }
}