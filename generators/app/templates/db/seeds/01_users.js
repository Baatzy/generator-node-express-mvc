const bcrypt = require('bcrypt-as-promised')

exports.seed = (knex) => {
  return bcrypt.hash('password').then(password => {
    return knex('users').insert([
      { id: 1, email: 'example@example.com', password }
    ])
  })
}
