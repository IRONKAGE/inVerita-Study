const jwtAuth = require('socketio-jwt-auth')
const { UserModel } = require('../models')

module.exports = io => {
  io.use(jwtAuth.authenticate({
    secret: process.env.JWT_SECRET
  }, async (payload, done) => {
    if (payload && payload.id) {
      try {
        const user = await UserModel.findById(payload.id)  
        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      } catch (e) {
        return done(e)
      }
    } else {
      return done()
    }
  }))

  io.on('connection', socket => {
    console.log('Присоединился', socket.request.user.id)

    socket.emit('success', {
      message: 'Вы успешно авторизовались по сокету',
      user: socket.request.user
    })
  })
}