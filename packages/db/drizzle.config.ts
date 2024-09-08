import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
});
