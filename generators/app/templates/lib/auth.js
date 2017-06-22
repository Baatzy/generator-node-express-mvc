const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt-as-promised')
const { User } = require('../models')

module.exports.init = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, cb) => {
    User.findByEmail(email)
      .then(user => {
        if (!user) return cb(null, false)

        return bcrypt.compare(password, user.password)
          .then(() => cb(null, user))
          .catch(() => cb(null, false))
      })
      .catch(cb)
  }))

  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })

  passport.deserializeUser((id, cb) => {
    User.findById(id).then(user => cb(null, user)).catch(cb)
  })

  return passport
}
