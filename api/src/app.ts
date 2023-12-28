import express from 'express'
import { logger } from './utils/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { routes } from './routes.js'
import cors from 'cors'
import pinoHttp from 'pino-http'
import cookieParser from 'cookie-parser'

async function main() {
  const app = express()
  const PORT = process.env.PORT

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  )

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(pinoHttp.pinoHttp())
  app.use(cookieParser(<string>process.env.SECRET))

  routes(app)

  app.use(errorHandler)

  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  logger.error(err, 'Server failed to run')
})
