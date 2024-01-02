import express from 'express'
import { logger } from './utils/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'
import expressSession from 'express-session'
import memoryStore from 'memorystore'
import passport from 'passport'
import { initializePassport } from './passport.js'
import { CLIENT_URL, COOKIE_NAME, SECRET_KEY, __IS_PROD__ } from './constants.js'
import { initializeRoutes } from './routes.js'

async function main() {
  const app = express()
  const PORT = process.env.PORT
  const MemoryStore = memoryStore(expressSession)

  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }),
  )

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(
    expressSession({
      secret: SECRET_KEY,
      name: COOKIE_NAME,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000, // 1 day
        httpOnly: true,
        secure: __IS_PROD__,
        sameSite: 'lax',
      },
      store: new MemoryStore({
        checkPeriod: 86400000,
      }),
    }),
  )

  initializePassport(passport)

  // Enable passport authentication, session and plug strategies
  app.use(passport.initialize())
  app.use(passport.session())

  initializeRoutes(app)

  app.use(errorHandler)

  app.listen(PORT, () => {
    logger.info(`Server running at ${process.env.API_URL}`)
  })
}

main().catch((err) => {
  logger.error(err, 'Server failed to run')
})
