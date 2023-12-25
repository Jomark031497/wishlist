import { Router } from 'express'
import * as authController from './auth.controller.js'

export const authRoutes = Router()

authRoutes.post('/login', authController.loginUserHandler)
authRoutes.post('/register', authController.registerUserHandler)
