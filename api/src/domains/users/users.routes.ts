import { Router } from 'express'
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
} from './users.controller.js'
import { validateSchema } from '../../middlewares/validateSchema.js'
import { insertUserSchema } from './users.schema.js'

const router = Router()

router.get('/', getAllUsersHandler)
router.get('/:id', getUserByIdHandler)

router.post('/', validateSchema(insertUserSchema), createUserHandler)

router.patch('/:id', validateSchema(insertUserSchema.partial()), updateUserHandler)

router.delete('/:id', deleteUserHandler)

export default router
