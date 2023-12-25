import { auth } from '../../lucia.js'
import { ApiError } from '../../utils/ApiError.js'
import { NewUser, User } from '../users/users.schema.js'
import { getUserById, getUserByUsername } from '../users/users.service.js'

export const loginUser = async (payload: User) => {
  const user = await getUserById(payload.id)
  if (!user) throw new ApiError(401, 'Invalid username or password')

  const key = await auth.useKey('username', payload.username.toLowerCase(), payload.password)

  const session = await auth.createSession({
    userId: key.userId,
    attributes: {},
  })

  return {
    session,
  }
}

export const registerUser = async (payload: NewUser) => {
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
    session,
  }
}

export const getAuthenticatedUser = () => {}
