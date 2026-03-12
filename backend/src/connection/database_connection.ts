import pg from "pg";

const { Pool } = pg;

const DB_DEFAULT_PORT = "5432";

const dbConnectionPool: pg.Pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: parseInt(process.env.DB_PORT || DB_DEFAULT_PORT, 10),
});

export default dbConnectionPool;
