import express from 'express'
import { logger } from './utils/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { routes } from './routes.js'
import cors from 'cors'

async function main() {
  const app = express()
  const PORT = process.env.PORT

  app.use(
    cors({
      origin: <string>process.env.CLIENT_URL,
      credentials: true,
    }),
  )

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  routes(app)

  app.use(errorHandler)

  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  logger.error(err, 'Server failed to run')
})
