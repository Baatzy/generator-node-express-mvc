var express = require('express')
var router = express.Router()
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('session/login', { user: (req.user || {}) })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.render('session/login', { user: req.user })
})

module.exports = router
