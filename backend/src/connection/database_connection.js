import { Pool } from 'pg';

const dbConnectionPool = new Pool({
  user: 'postgres',           // your PostgreSQL username
  host: 'localhost',          // or your server address
  database: 'mtg-card-generator_DB', // your database name
  password: 'Shanks_postgre',  // your PostgreSQL password
  port: 5432,                 // default PostgreSQL port
});

export default dbConnectionPool;