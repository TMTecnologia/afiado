import { drizzle } from 'drizzle-orm/libsql';
import { createClient as libSqlCreateClient } from '@libsql/client';

export const createDatabase = (props: Parameters<typeof libSqlCreateClient>[0]) => {
  const client = libSqlCreateClient(props);
  return drizzle(client);
}

