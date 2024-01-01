import express from 'express'
import { logger } from './utils/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { routes } from './routes.js'
import cors from 'cors'
import expressSession from 'express-session'
import passport from 'passport'
import { initializePassport } from './config/passport.js'

async function main() {
  const app = express()
  const PORT = process.env.PORT

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
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
    }),
  )

  initializePassport(passport)

  app.use(passport.initialize())
  app.use(passport.session())

  routes(app)

  app.use(errorHandler)

  app.listen(PORT, () => {
    logger.info(`Server running at ${process.env.API_URL}`)
  })
}

main().catch((err) => {
  logger.error(err, 'Server failed to run')
})
