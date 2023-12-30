import { Router } from 'express'
import { getAuthenticatedUserHandler, loginUserHandler, logoutUserHandler } from './auth.controller.js'
import { validateSchema } from '../../middlewares/validateSchema.js'
import { selectUserSchema } from '../users/users.schema.js'
import { requireAuth } from '../../middlewares/requireAuth.js'

const router = Router()

router.get('/user', requireAuth, getAuthenticatedUserHandler)

router.post('/login', validateSchema(selectUserSchema.pick({ email: true, password: true })), loginUserHandler)

router.delete('/logout', requireAuth, logoutUserHandler)

export default router
