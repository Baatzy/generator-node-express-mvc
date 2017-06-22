const db = require('../db')
const Model = require('objection').Model

Model.knex(db)

class User extends Model {
  static get tableName () {
    return 'users'
  }

  static findByEmail (email) {
    return this.query().where({ email }).first()
  }

  static findById (id) {
    return this.query().where({ id }).first()
  }
}

module.exports = User
