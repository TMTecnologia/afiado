import { migrate } from 'drizzle-orm/libsql/migrator';
import { createDatabase } from './src/client';

const { db, connection } = createDatabase({ url: process.env.DATABASE_URL! })

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './migrations' });

// Don't forget to close the connection, otherwise the script will hang
connection.close();
