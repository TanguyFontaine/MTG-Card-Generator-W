const { Pool } = require('pg');

const dbConnectionPool = new Pool({
  user: 'postgres',           // your PostgreSQL username
  host: 'localhost',          // or your server address
  database: 'mtg-card-generator_db', // your database name
  password: 'Shanks_postgre',  // your PostgreSQL password
  port: 5432,                 // default PostgreSQL port
});

module.exports = dbConnectionPool;