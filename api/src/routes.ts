import { Express } from 'express'
import authRoutes from './domains/auth/auth.routes.js'
import usersRoutes from './domains/users/users.routes.js'

export const routes = (app: Express) => {
  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
      })
    }

    return res.json({
      isAuthenticated: req.isAuthenticated(),
    })
  })

  app.use('/api/users', usersRoutes)
  app.use('/api/auth', authRoutes)
}
