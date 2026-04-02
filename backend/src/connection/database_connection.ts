import pg from "pg";

const { Pool } = pg;

// Support Neon-style DATABASE_URL (used in production) or individual vars (used locally)
function createPoolConfig(): pg.PoolConfig
{
   if (process.env.DATABASE_URL)
   {
      return {
         connectionString: process.env.DATABASE_URL,
         ssl: { rejectUnauthorized: false },
      };
   }

   return {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT ?? "5432", 10),
   };
}

const dbConnectionPool: pg.Pool = new Pool(createPoolConfig());

export default dbConnectionPool;
