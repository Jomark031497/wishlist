import { Router } from 'express'
import { getAuthenticatedUserHandler, loginUserHandler, logoutUserHandler } from './auth.controller.js'
import { validateSchema } from '../../middlewares/validateSchema.js'
import { selectUserSchema } from '../users/users.schema.js'
import { requireAuth } from '../../middlewares/requireAuth.js'
import passport from 'passport'
import { ApiError } from '../../utils/ApiError.js'

const router = Router()

router.get('/user', requireAuth, getAuthenticatedUserHandler)
router.get('/login/google', (req, res, next) => {
  passport.authenticate('google', { scope: ['profile'] })(req, res, next)
})

router.get(
  '/login/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login/failed' }),
)

router.get('/login/discord', passport.authenticate('discord'))

router.get(
  '/login/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login/failed' }, (req, res, next) => {
    try {
      res.json(req.user)
    } catch (error) {
      throw new ApiError(500, 'Unable to login using discord')
    }
  }),
)

router.get('/login/failed', (req, res) => {
  res.status(401).json({ success: false, message: 'failure' })
})

router.post('/login', validateSchema(selectUserSchema.pick({ email: true, password: true })), loginUserHandler)

router.delete('/logout', requireAuth, logoutUserHandler)

export default router
