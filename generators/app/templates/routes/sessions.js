const express = require('express')
const router = express.Router()
const passport = require('passport')
const bouncer = require('connect-ensure-login')
const { sessions: ctrl } = require('../controllers')

router.get('/login', bouncer.ensureUnauthenticated('/profile'), ctrl.login)
router.get('/logout', bouncer.ensureAuthenticated('/login'), ctrl.logout)
router.get('/signup', bouncer.ensureUnauthenticated('/profile'), ctrl.signup)

const authenticateOptions = {
  successRedirect: '/profile',
  successFlash: true,
  failureRedirect: '/login',
  failureFlash: true
}

router.post('/login',
  bouncer.ensureUnauthenticated('/profile'),
  passport.authenticate('local', authenticateOptions))
router.post('/signup',
  bouncer.ensureUnauthenticated('/profile'),
  ctrl.register, passport.authenticate('local', authenticateOptions))

module.exports = router
