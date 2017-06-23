const { User } = require('../models')

function login (req, res) {
  res.render('sessions/login')
}

function logout (req, res) {
  req.logout()
  res.redirect('/login')
}

function signup (req, res) {
  res.render('sessions/signup')
}

function register (req, res, next) {
  const { email, password } = req.body
  User.save({ email, password })
    .then(user => next())
    .catch((err) => {
      req.flash('error', err.message)
      res.redirect('/signup')
    })
}

module.exports = {
  login, logout, signup, register
}
