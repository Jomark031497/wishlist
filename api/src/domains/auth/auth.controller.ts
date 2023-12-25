import { NextFunction, Request, Response } from 'express'
import * as authService from './auth.service.js'
import { auth } from '../../lucia.js'
import { ApiError } from '../../utils/ApiError.js'

export const registerUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authService.registerUser(req.body)
    const authRequest = auth.handleRequest(req, res)
    authRequest.setSession(data.session)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authService.loginUser(req.body)
    const authRequest = auth.handleRequest(req, res)
    authRequest.setSession(data.session)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

export const getAuthenticatedUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authRequest = auth.handleRequest(req, res)
    const session = await authRequest.validate() // or `authRequest.validateBearerToken()`
    if (session) {
      const user = session.user
      const username = user.username
      return res.json({ user, username })
    }

    throw new ApiError(401, 'Unauthenticated')
  } catch (error) {
    next(error)
  }
}
