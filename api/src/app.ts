import express from 'express'
import { logger } from './utils/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'
import expressSession from 'express-session'
import memoryStore from 'memorystore'
import passport from 'passport'
import { initializePassport } from './passport.js'
import { initializeRoutes } from './routes.js'
import { __API_URL__, __CLIENT_URL__, __COOKIE_NAME__, __SECRET_KEY__ } from './constants.js'

async function main() {
  const app = express()
  const PORT = process.env.PORT
  const MemoryStore = memoryStore(expressSession)

  app.use(
    cors({
      origin: __CLIENT_URL__,
      credentials: true,
    }),
  )

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(
    expressSession({
      name: __COOKIE_NAME__,
      secret: __SECRET_KEY__,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000, // 1 day
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
    logger.info(`Server running at ${__API_URL__}`)
  })
}

main().catch((err) => {
  logger.error(err, 'Server failed to run')
})
