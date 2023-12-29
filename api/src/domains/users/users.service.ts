import { eq } from 'drizzle-orm'
import { db } from '../../db/client.js'
import { NewUser, User, users } from './users.schema.js'
import { ApiError } from '../../utils/ApiError.js'
import { hash } from 'argon2'

export const getAllUsers = async () => {
  const query = await db
    .select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
    })
    .from(users)
  return query
}

export const getUserById = async (id: User['id']) => {
  const query = await db
    .select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
    })
    .from(users)
    .where(eq(users.id, id))
  return query[0]
}

export const getUserByEmail = async (email: User['email']) => {
  const query = await db
    .select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
    })
    .from(users)
    .where(eq(users.email, email))
  return query[0]
}

export const createUser = async (payload: NewUser) => {
  const user = await getUserByEmail(payload.email)
  if (user) throw new ApiError(400, 'Email is already taken')

  const hashedPassword = await hash(payload.password)

  const query = await db
    .insert(users)
    .values({ ...payload, password: hashedPassword })
    .returning({
      id: users.id,
      email: users.email,
    })

  return query[0]
}

export const updateUser = async (id: User['id'], payload: NewUser) => {
  const user = await getUserById(id)
  if (!user) throw new ApiError(400, 'User not found')

  const query = await db
    .update(users)
    .set({ ...user, ...payload })
    .where(eq(users.id, user.id))
    .returning({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
    })

  return query[0]
}

export const deleteUser = async (id: User['id']) => {
  const user = await getUserById(id)
  if (!user) throw new ApiError(400, 'User not found')

  await db.delete(users).where(eq(users.id, user.id))

  return { success: true }
}
