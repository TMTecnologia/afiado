import { Database } from "./client"
import { User } from './users'

export const DATABASE_URL = 'file:local.db'

export const createDatabaseClient = () => {
  const db = new Database({ url: DATABASE_URL })
  
  return {
    users: new User(db),
  }
}
