module.exports = {
  development: {
    username: process.env.PGUSER || 'chris',
    password: null,
    database: 'sudokulor-dev',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.PGUSER || 'chris',
    password: null,
    database: 'sudokulor-test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'POSTGRES_DB_URL',
    username: process.env.PGUSER || 'root',
    password: null,
    database: 'react_webpack_node_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
