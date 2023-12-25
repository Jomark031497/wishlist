import { eq } from 'drizzle-orm'
import { db } from '../../db/client.js'
import { NewUser, User, user } from './users.schema.js'
import { ApiError } from '../../utils/ApiError.js'
import { auth } from '../../lucia.js'

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

export const createUser = async (payload: NewUser) => {
  const userExists = await getUserByUsername(payload.username)
  if (userExists) throw new ApiError(409, 'Username is already taken. Please choose a different username')

  const user = await auth.createUser({
    key: {
      providerId: 'username', // auth method
      providerUserId: payload.username.toLowerCase(), // unique id when using "username" auth method
      password: payload.password, // already hashed by lucia
    },
    attributes: {
      username: payload.username,
    },
  })

  const session = await auth.createSession({
    userId: user.userId,
    attributes: {},
  })

  return {
    user,
    session,
  }
}
