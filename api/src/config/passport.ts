import { type PassportStatic } from 'passport'
import { createUser, getUserById, getUserByProviderEmail } from '../domains/users/users.service.js'
import { ApiError } from '../utils/ApiError.js'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { logger } from '../utils/logger.js'

export async function initializePassport(passport: PassportStatic) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: <string>process.env.GOOGLE_CLIENT_ID,
        clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/auth/google/callback',
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        logger.info('Using Google Strategy...')

        try {
          const email = profile['_json']['email']
          logger.info(email, 'Email found...')

          if (!email) return done(new ApiError(400, 'Failed to receive email from Google. Please try again :('))

          const user = await getUserByProviderEmail('googleId', email)

          if (user) {
            logger.info('User is found. returning user...')

            return done(null, user)
          }

          logger.info('User not found. creating user...')

          const newUser = await createUser({
            name: profile.displayName,
            googleAccessToken: accessToken,
            googleId: profile.id,
            googleEmail: email,
          })

          logger.info(user, 'user created. returning new user...')

          return done(null, newUser)
        } catch (error) {
          if (error instanceof Error) {
            return done(new ApiError(400, error.message))
          }
          return done(new ApiError(400, 'Google Login Failed'))
        }
      },
    ),
  )

  // passport.use(
  //   new OIDCStrategy(
  //     {
  //       clientID: <string>process.env.AZURE_CLIENT_ID,
  //       clientSecret: <string>process.env.AZURE_CLIENT_SECRET,
  //       identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration',
  //       responseType: 'code id_token',
  //       responseMode: 'form_post',
  //       redirectUrl: 'https://login.microsoftonline.com/fe9f51f9-56b5-4661-8a63-51c84f4c29ab/oauth2/v2.0/authorize',
  //       passReqToCallback: true,
  //     },
  //     async (req, iss, sub, profile, jwtClaims, accessToken, refresh_token, params, done) => {
  //       try {
  //         const email = profile['_json']['email']
  //         if (!email) return done(new ApiError(400, 'Failed to receive email from Google. Please try again :('))

  //         const user = await getUserByEmail(email)

  //         if (user) {
  //           return done(null, user)
  //         }

  //         const newUser = await createUser({
  //           name: profile.displayName,
  //           profileId: profile.oid,
  //           email: email,
  //           accessToken,
  //         })

  //         return done(null, newUser)
  //       } catch (error) {
  //         if (error instanceof Error) {
  //           return done(new ApiError(400, error.message))
  //         }
  //         return done(new ApiError(400, 'Azure Login Failed'))
  //       }
  //     },
  //   ),
  // )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser((user: any, done) => {
    logger.info(user, 'Serializing user...')
    process.nextTick(() => {
      done(null, user.id)
    })
  })

  passport.deserializeUser((id: string, done) => {
    logger.info(id, 'Deserializing user...')

    process.nextTick(async () => {
      const user = await getUserById(id)
      if (!user) return done(new ApiError(400, 'User not found'), false)

      return done(null, user)
    })
  })
}
