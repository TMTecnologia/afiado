import { createDatabase } from "./client"
import { User } from './users'

export const DATABASE_URL = 'file:local.db'

export const createDatabaseClient = () => {
  const db = createDatabase({ url: DATABASE_URL })
 
  return {
    users: new User(db),
  }
}
