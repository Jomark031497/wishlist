import { NextFunction, Request, Response } from 'express'
import * as usersService from './users.service.js'

export const getUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await usersService.getUsers()
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

export const getUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await usersService.getUserById(req.params.id!)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await usersService.createUser(req.body)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}
