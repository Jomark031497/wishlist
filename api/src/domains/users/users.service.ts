import { eq } from 'drizzle-orm'
import { db } from '../../db/client.js'
import { type NewUser, users } from './users.schema.js'

export async function getUserById(id: string) {
  const query = await db.select().from(users).where(eq(users.id, id))
  return query[0]
}

export async function getUserByEmail(email: string) {
  const query = await db.select().from(users).where(eq(users.email, email))
  return query[0]
}

export async function createUser(payload: NewUser) {
  const query = await db.insert(users).values(payload).returning()
  return query[0]
}
