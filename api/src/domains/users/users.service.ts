import { eq } from 'drizzle-orm'
import { db } from '../../db/client.js'
import { NewUser, User, user } from './users.schema.js'
import { auth } from '../../lucia.js'
import { ApiError } from '../../utils/ApiError.js'

export const findUserById = async (id: User['id']) => {
  const query = await db.select().from(user).where(eq(user.id, id))
  return query[0]
}

export const findUserByUsername = async (username: User['username']) => {
  const query = await db.select().from(user).where(eq(user.username, username))
  return query[0]
}

export const createUser = async (payload: NewUser) => {
  const userExists = await findUserById(payload.username)
  if (userExists) throw new ApiError(400, 'User is already in the database')

  try {
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
      session,
    }
  } catch (error) {
    console.log(error)
    throw new ApiError(500, 'Something went wrong')
  }
}

export const signInUser = async (payload: NewUser) => {
  try {
    const key = await auth.useKey('username', payload.username.toLowerCase(), payload.password)

    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    })

    return {
      session,
    }
  } catch (error) {
    throw new ApiError(500, 'Something went wrong')
  }
}
