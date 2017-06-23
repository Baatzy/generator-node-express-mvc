const express = require('express')
const router = express.Router()
const passport = require('passport')
const { User } = require('../models')

router.get('/login', (req, res) => {
  res.render('sessions/login')
})

router.post('/login',
  passport.authenticate('local',
    { successRedirect: '/profile', successFlash: true, failureRedirect: '/login', failureFlash: true }))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

router.get('/signup', (req, res) => {
  res.render('sessions/signup')
})

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body
  User.save({ email, password })
    .then(user => next())
    .catch((err) => {
      req.flash('error', err.message)
      res.redirect('/signup')
    })
}, passport.authenticate('local',
  { successRedirect: '/profile', successFlash: true, failureRedirect: '/login', failureFlash: true }))

module.exports = router
