require('dotenv').config();
const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const { migrate } = require('drizzle-orm/node-postgres/migrator');

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // TODO: switch to the RDS CA bundle to keep certificate verification on
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });
  try {
    await migrate(drizzle(pool), { migrationsFolder: './src/db/migrations' });
    console.log('migrations ok');
  } finally {
    await pool.end();
  }
}

main().catch((e) => {
  console.error('MIGRATION ERROR:', e);
  process.exit(1);
});