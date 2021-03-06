exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
