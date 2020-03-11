const { UserModel } = require('../models')
const passport = require('../auth')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  signUp: async (ctx, next) => {
    try {
      const { username , password } = ctx.request.body
      const isExist = await UserModel.findOne({ username })

      if (!isExist) {
        const newUser = await UserModel.create({ username , password})
        ctx.status = 201
        ctx.body = { username: newUser.username, token: jwtSign({ id: newUser.id })}
      } else {
        ctx.status = 400
        ctx.body = 'Пользователь с таким логином уже зарегистрирован.'
      }
    } catch (e) {
      ctx.throw(500, e.message)
    }
  },
  signIn: async (ctx, next) => {
    try {
      await passport.authenticate('local', (err, user) => {
        if (err || !user) {
          ctx.status = 401
          ctx.body = 'Пользователь с данным логином не зарегистрирован или пароль неверен.'
        } else {
          ctx.body = 200
          ctx.body = { username: user.username, token: jwtSign({ id: user.id})}
        }
      })(ctx, next)
    } catch (e) {
      ctx.throw(500, e.message)
    }
  },
  restrictToAuth: async (ctx, next) => {
    await passport.authenticate('jwt', (err, user) => {
      if (err || !user) {
        ctx.status = 403
        ctx.body = err || 'Необходима авторизация'
      } else {
        ctx.status = 200
        ctx.user = user
        return next()
      }
    })(ctx, next)
  }
}

jwtSign = (payload) => {
  const one_week = 60 * 60 * 24 * 7
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: one_week })
  return token
}
