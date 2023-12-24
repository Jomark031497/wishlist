import { eq } from 'drizzle-orm'
import { db } from '../../db/client.js'
import { NewUser, User, users } from './users.schema.js'

export async function findOne(id: User['id']) {
  const query = await db.select().from(users).where(eq(users.id, id))
  if (!query.length) throw new Error('User not found')
  return query[0]
}

export async function createOne(payload: NewUser) {
  const query = await db.insert(users).values(payload)
  return query[0]
}
