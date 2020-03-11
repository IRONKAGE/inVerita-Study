const Koa       = require('koa')
const cors      = require('@koa/cors')
const koaBody   = require('koa-body')
const logger    = require('koa-morgan')
const dotenv    = require('dotenv')
const mongoose  = require('mongoose')

dotenv.config()

const app       = new Koa()
const passport  = require('./auth')
const router    = require('./routes')
const server    = require('http').createServer(app.callback())
const io        = require('socket.io')(server)
const sockets   = require('./sockets')(io)

mongoose.Promise = global.Promise
mongoose.set('debug', true)
mongoose.connect(process.env.MONGODB, err => console.log(err || 'MongoDB is connected'))

app
  .use(cors())
  .use(logger('tiny'))
  .use(koaBody())
  .use(passport.initialize())
  .use(router.routes())
  .use(router.allowedMethods())

const PORT = process.env.PORT || 1337

server.listen(PORT, () => console.log('От Винта!'))