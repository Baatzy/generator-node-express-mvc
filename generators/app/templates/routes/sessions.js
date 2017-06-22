var express = require('express')
var router = express.Router()
const passport = require('passport')

/* GET users listing. */
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user })
})

module.exports = router
