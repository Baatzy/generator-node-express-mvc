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
        const msg = { message: 'Email or Password is incorrect' }
        if (!user) return cb(null, false, msg)

        return bcrypt.compare(password, user.password)
          .then(() => cb(null, user, { message: 'Welcome!' }))
          .catch(() => cb(null, false, msg))
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
