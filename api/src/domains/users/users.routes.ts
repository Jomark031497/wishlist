import { Router } from 'express'
import { createUserHandler, getAuthenticatedUserHandler, signInUserHandler } from './users.controller.js'

export const usersRoutes = Router()

usersRoutes.get('/me', getAuthenticatedUserHandler)

usersRoutes.post('/register', createUserHandler)

usersRoutes.post('/login', signInUserHandler)
