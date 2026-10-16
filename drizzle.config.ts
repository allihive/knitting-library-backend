import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const databaseUrl = new URL(process.env.DATABASE_URL!);

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port || 5432),
    user: decodeURIComponent(databaseUrl.username),
    password: decodeURIComponent(databaseUrl.password),
    database: databaseUrl.pathname.slice(1),
    ssl: { rejectUnauthorized: false },
  },
});
