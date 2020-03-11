const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const { UserModel } = require('./models')
const JWT_SECRET = process.env.JWT_SECRET

passport.use(new LocalStrategy({ 
  session: false
}, async (username, password, done) => {
  try {
    const user = await UserModel.findOne({ username }).select('+password').exec()
    const isMatch = await user.isValidPassword(password)

    if (!user || !isMatch) {
      return done(null, false)
    }

    done(null, user)
  } catch (e) {
    done(e)
  }
})
)

passport.use(new JwtStrategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.id)

    if (!user) {
      return done(null, false)
    }

    done(null, user)
  } catch (e) {
    done(e)
  }
})
)

module.exports = passport