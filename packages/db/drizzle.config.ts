import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from './src';

export default defineConfig({
  schema: './src/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: DATABASE_URL,
  }
});
