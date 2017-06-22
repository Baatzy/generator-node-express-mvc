exports.seed = (knex) => {
  const tables = ['users']
  const promises = tables.map(table => {
    return knex('users').del()
      .then(() => {
        return knex.raw(
          `SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`
        )
      })
  })

  return Promise.all(promises)
}
