import { Router } from 'express'
import { requireAuth } from '../../middlewares/requireAuth.js'
import * as authController from './auth.controller.js'

const router = Router()

router.get('/google', authController.googleAuthHandler)
router.get('/google/callback', authController.googleAuthCallbackHandler)

router.get('/azure', authController.azureAuthHandler)
router.post('/azure/callback', authController.azureAuthCallbackHandler)

router.delete('/logout', requireAuth, authController.logoutHandler)
router.get('/user', requireAuth, authController.getAuthenticatedUserHandler)

export default router
