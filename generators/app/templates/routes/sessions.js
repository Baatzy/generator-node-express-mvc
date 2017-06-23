const express = require('express')
const router = express.Router()
const passport = require('passport')
const { sessions: ctrl } = require('../controllers')

router.get('/login', ctrl.login)
router.get('/logout', ctrl.logout)
router.get('/signup', ctrl.signup)

const authenticateOptions = {
  successRedirect: '/profile',
  successFlash: true,
  failureRedirect: '/login',
  failureFlash: true
}

router.post('/login', passport.authenticate('local', authenticateOptions))
router.post('/signup', ctrl.register, passport.authenticate('local', authenticateOptions))

module.exports = router
