let jwt = require('jsonwebtoken');
const config = require('../config/config');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('inVerita ')) {
            token = token.slice(9, token.length);
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token не валідний'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Не підтверждений Token'
        });
    }
};

module.exports = {
    checkToken: checkToken
};
