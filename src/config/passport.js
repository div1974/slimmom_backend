const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { UserService } = require('../services')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.SECRET_KEY

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY
}

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const service = new UserService()
      const user = await service.findById(payload.id)

      if (!user) {
        return done(new Error('User not found'))
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, user)
    } catch (err) {
      done(err)
    }
  })
)
