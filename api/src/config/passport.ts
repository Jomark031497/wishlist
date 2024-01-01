import { PassportStatic } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as DiscordStrategy } from 'passport-discord'
import {
  createUser,
  getUserByDiscordId,
  getUserByEmail,
  getUserByGoogleId,
  getUserById,
} from '../domains/users/users.service.js'
import { ApiError } from '../utils/ApiError.js'
import { verify } from 'argon2'
import { User } from '../domains/users/users.schema.js'
import { logger } from '../utils/logger.js'

export const initializePassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = await getUserByEmail(email)
      if (!user) return done(new ApiError(400, 'Invalid Username/Password'), false)

      if (!user.password) return done(new ApiError(400, 'Invalid Username/Password'))
      const isPasswordVerified = await verify(user.password, password)
      if (!isPasswordVerified) return done(new ApiError(400, 'Invalid Username/Password'), false)

      return done(null, user)
    }),
  )

  passport.use(
    new GoogleStrategy(
      {
        clientID: <string>process.env.GOOGLE_CLIENT_ID,
        clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/auth/login/google/callback',
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        const user = await getUserByGoogleId(profile.id)
        if (!user) {
          return done(null, profile)
        }

        const createdUser = await createUser({
          googleId: profile.id,
        })

        return done(null, createdUser)
      },
    ),
  )

  passport.use(
    new DiscordStrategy(
      {
        clientID: <string>process.env.DISCORD_CLIENT_ID,
        clientSecret: <string>process.env.DISCORD_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/auth/login/discord/callback',
        scope: ['identify', 'email', 'guilds', 'guilds.join'],
      },
      async function (accessToken, refreshToken, profile, cb) {
        const user = await getUserByDiscordId(profile.id)
        logger.info(user)
        if (!user) {
          return cb(null, profile)
        }

        const createdUser = await createUser({
          discordId: profile.id,
        })

        return cb(null, createdUser)
      },
    ),
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
