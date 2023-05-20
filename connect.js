const { Pool } = require('pg');

const pool = new Pool({
  user: 'akezanna',
  host: 'localhost',
  database: 'kezann_shop_db',
  password: '@Abdou1337',
  port: 5432,
});

module.exports = pool;