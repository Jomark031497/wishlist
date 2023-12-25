import { Express } from 'express'
import { authRoutes } from './domains/auth/auth.routes.js'
import { usersRoutes } from './domains/users/users.routes.js'

export const routes = (app: Express) => {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', usersRoutes)
}
