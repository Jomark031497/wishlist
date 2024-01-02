import type { Express } from 'express'
import authRoutes from './domains/auth/auth.routes.js'
import usersRoutes from './domains/users/users.routes.js'

export const initializeRoutes = (app: Express) => {
  app.use('/api/auth', authRoutes)
  app.use('/api/users', usersRoutes)
}
