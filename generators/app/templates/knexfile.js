const database = '<%= db %>'
const path = require('path')

module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://localhost:5432/${database}_dev`,
    migrations: {
      directory: path.join('db', 'migrations')
    },
    seeds: {
      directory: path.join('db', 'seeds')
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join('db', 'migrations')
    },
    seeds: {
      directory: path.join('db', 'seeds')
    }
  }
}
