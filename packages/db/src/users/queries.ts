import { drizzle } from "drizzle-orm/libsql";
import type { InsertUser } from "./schema";
import { usersTable } from "./schema";

export class User {
  db: ReturnType<typeof drizzle>

  constructor(db: ReturnType<typeof drizzle>){
    this.db = db; 
  }

  createUser(data: InsertUser) {
    return this.db.insert(usersTable).values(data);
  }
}
