import { type PassportStatic } from 'passport'
import { createUser, getUserByAzureEmail, getUserByGoogleEmail, getUserById } from './domains/users/users.service.js'
import { ApiError } from './utils/ApiError.js'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { OIDCStrategy } from 'passport-azure-ad'
import { __API_URL__, __IS_PROD__ } from './constants.js'
import { type User } from './domains/users/users.schema.js'

export async function initializePassport(passport: PassportStatic) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: <string>process.env.GOOGLE_CLIENT_ID,
        clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${__API_URL__}/api/auth/google/callback`,
        scope: ['profile', 'email'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile['_json']['email']
          if (!email) return done(new ApiError(400, 'Failed to receive email from Google. Please try again :('))
          const user = await getUserByGoogleEmail(email)

          if (user) return done(null, user)

          const newUser = await createUser({
            name: profile.displayName,
            googleId: profile.id,
            googleEmail: email,
          })

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

  passport.use(
    new OIDCStrategy(
      {
        clientID: <string>process.env.AZURE_CLIENT_ID,
        clientSecret: <string>process.env.AZURE_CLIENT_SECRET,
        identityMetadata: <string>process.env.AZURE_IDENTITY_METADATA,
        responseType: 'code',
        responseMode: 'form_post',
        redirectUrl: `${__API_URL__}/api/auth/azure/callback`,
        passReqToCallback: true,
        allowHttpForRedirectUrl: !__IS_PROD__,
        scope: ['email', 'profile'],
      },
      async (_req, _iss, _sub, profile, _jwtClaims, _accessToken, _refresh_token, _params, done) => {
        try {
          const email = profile._json['email']
          if (!email) return done(new ApiError(400, 'Failed to receive email from Azure. Please try again :('))

          const user = await getUserByAzureEmail(email)
          if (user) return done(null, user)

          const newUser = await createUser({
            name: profile.displayName,
            azureId: profile.oid,
            azureEmail: email,
          })

          return done(null, newUser)
        } catch (error) {
          if (error instanceof Error) {
            return done(new ApiError(400, error.message))
          }
          return done(new ApiError(400, 'Azure Login Failed'))
        }
      },
    ),
  )

  passport.serializeUser((unknownUser: unknown, done) => {
    const user = unknownUser as User
    process.nextTick(() => {
      done(null, user.id)
    })
  })

  passport.deserializeUser((id: string, done) => {
    process.nextTick(async () => {
      const user = await getUserById(id)
      if (!user) return done(new ApiError(400, 'User not found'), false)

      return done(null, user)
    })
  })
}
