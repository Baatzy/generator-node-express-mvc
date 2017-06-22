const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const Knex = require('knex')

module.exports = Knex(config)
