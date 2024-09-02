import { drizzle } from 'drizzle-orm/libsql';
import { createClient as libSqlCreateClient } from '@libsql/client';

export class Database {
  db: ReturnType<typeof drizzle>

  constructor(props: Parameters<typeof libSqlCreateClient>[0]){
    const client = libSqlCreateClient(props);

    this.db = drizzle(client); 
  }
}

