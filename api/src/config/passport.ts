import { PassportStatic } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { getUserByEmail, getUserById } from '../domains/users/users.service.js'
import { ApiError } from '../utils/ApiError.js'
import { verify } from 'argon2'
import { User } from '../domains/users/users.schema.js'

export const initializePassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = await getUserByEmail(email)
      if (!user) return done(new ApiError(400, 'Invalid Username/Password'), false)

      const isPasswordVerified = await verify(user.password, password)
      if (!isPasswordVerified) return done(new ApiError(400, 'Invalid Username/Password'), false)

      return done(null, user)
    }),
  )

  passport.serializeUser((user: unknown, done) => {
    const castedUser = user as User
    done(null, castedUser.id)
  })

  passport.deserializeUser(async (id: string, done) => {
    const user = await getUserById(id)
    if (!user) return done(new ApiError(400, 'Invalid User ID'), false)

    return done(null, user)
  })
}
