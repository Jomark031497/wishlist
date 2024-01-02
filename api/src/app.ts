import express from 'express'
import { logger } from './utils/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'
import expressSession from 'express-session'
// import memoryStore from 'memorystore'
import passport from 'passport'
import { initializePassport } from './config/passport.js'
import authRoutes from './domains/auth/auth.routes.js'

async function main() {
  const app = express()
  const PORT = process.env.PORT

  // const MemoryStore = memoryStore(expressSession)

  initializePassport(passport)

  app.use(
    cors({
      origin: <string>process.env.CLIENT_URL,
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }),
  )

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(
    expressSession({
      secret: <string>process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000,
      },
      // store: new MemoryStore({
      //   checkPeriod: 86400000,
      // }),
    }),
  )

  // Enable passport authentication, session and plug strategies
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/', (req, res) =>
    res.json({
      message: 'Hello world!',
      isAuthenticated: req.isAuthenticated(),
    }),
  )
  app.use('/api/auth', authRoutes)

  app.use(errorHandler)

  app.listen(PORT, () => {
    logger.info(`Server running at ${process.env.API_URL}`)
  })
}

main().catch((err) => {
  logger.error(err, 'Server failed to run')
})
