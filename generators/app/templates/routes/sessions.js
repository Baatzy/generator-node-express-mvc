var express = require('express')
var router = express.Router()
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('session/login')
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/login', failureRedirect: '/login' }))

module.exports = router
