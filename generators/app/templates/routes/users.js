const express = require('express')
const router = express.Router()
const { users: ctrl } = require('../controllers')

router.get('/profile', ctrl.show)

module.exports = router
