import { eq } from 'drizzle-orm'
import { db } from '../../db/client.js'
import { User, user } from './users.schema.js'

export const getUsers = async () => {
  const query = await db.select().from(user)
  return query
}

export const getUserById = async (id: User['id']) => {
  const query = await db.select().from(user).where(eq(user.id, id))
  return query[0]
}

export const getUserByUsername = async (username: User['username']) => {
  const query = await db.select().from(user).where(eq(user.username, username))
  return query[0]
}
