import { createDatabase } from "./client"
import { User } from './users'

export const createDatabaseClient = () => {
  const { db } = createDatabase({
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN,
  })
 
  return {
    users: new User(db),
  }
}
