import { Router } from 'express'
import * as usersController from './users.controller.js'

export const usersRoutes = Router()

usersRoutes.get('/', usersController.getUsersHandler)
usersRoutes.get('/:id', usersController.getUserByIdHandler)
