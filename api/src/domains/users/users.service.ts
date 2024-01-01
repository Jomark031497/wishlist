import { eq } from 'drizzle-orm'
import { db } from '../../db/client.js'
import { NewUser, User, users } from './users.schema.js'
import { ApiError } from '../../utils/ApiError.js'
import { hash } from 'argon2'

export const getAllUsers = async () => {
  const query = await db.select().from(users)
  return query
}

export const getUserById = async (id: User['id']) => {
  const query = await db.select().from(users).where(eq(users.id, id))
  return query[0]
}

export const getUserByEmail = async (email: User['email']) => {
  if (!email) throw new ApiError(400, 'Please enter a valid email address')
  const query = await db.select().from(users).where(eq(users.email, email))
  return query[0]
}

export const getUserByGoogleId = async (id: User['googleId']) => {
  if (!id) throw new ApiError(400, 'Google ID not found')
  const query = await db.select().from(users).where(eq(users.googleId, id))
  return query[0]
}

export const getUserByDiscordId = async (id: User['discordId']) => {
  if (!id) throw new ApiError(400, 'Discord ID not found')
  const query = await db.select().from(users).where(eq(users.discordId, id))
  return query[0]
}

export const createUser = async (payload: NewUser) => {
  if (!payload.email) throw new ApiError(400, 'Please enter a valid email address')
  const user = await getUserByEmail(payload.email)
  if (user) throw new ApiError(400, 'Email is already taken')

  await db.insert(users).values({
    ...payload,
    ...(payload.password && {
      password: await hash(payload.password),
    }),
  })

  return { success: true }
}

export const updateUser = async (id: User['id'], payload: NewUser) => {
  const user = await getUserById(id)
  if (!user) throw new ApiError(400, 'User not found')

  await db
    .update(users)
    .set({ ...user, ...payload })
    .where(eq(users.id, user.id))

  return { success: true }
}

export const deleteUser = async (id: User['id']) => {
  const user = await getUserById(id)
  if (!user) throw new ApiError(400, 'User not found')

  await db.delete(users).where(eq(users.id, user.id))

  return { success: true }
}
