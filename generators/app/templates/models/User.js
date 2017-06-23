const db = require('../db')
const Model = require('objection').Model
const bcrypt = require('bcrypt-as-promised')

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

  static save ({ email, password }) {
    const validationError = new Error('User could not be saved')

    if (!password) {
      validationError.message = 'Password is required'
      return Promise.reject(validationError)
    }

    return bcrypt.hash(password).then(hashed => {
      const data = { email, password: hashed }
      return this.query().insert(data).catch(() => {
        validationError.message = 'Email is taken or malformed'
        return Promise.reject(validationError)
      })
    })
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [ 'email', 'password' ],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 8 },
        password: { type: 'string', minLength: 8 }
      }
    }
  }
}

module.exports = User
