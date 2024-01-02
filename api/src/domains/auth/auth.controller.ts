import type { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { COOKIE_NAME } from '../../constants.js'
import { ApiError } from '../../utils/ApiError.js'

export const getAuthenticatedUserHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json(req.user)
  } catch (error) {
    return next(error)
  }
}

export const googleAuthHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('google')(req, res, next)
  } catch (error) {
    return next(error)
  }
}

export const googleAuthCallbackHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('google', () => {
      res.status(200).json({ success: true })
    })(req, res, next)
  } catch (error) {
    return next(error)
  }
}

export const azureAuthHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('azuread-openidconnect')(req, res, next)
  } catch (error) {
    return next(error)
  }
}

export const azureAuthCallbackHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('azuread-openidconnect', () => {
      res.status(200).json({ success: true })
    })(req, res, next)
  } catch (error) {
    return next(error)
  }
}

export const logoutHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session.destroy((err) => {
      if (err) throw new ApiError(401, 'Unauthorized')
      res.clearCookie(COOKIE_NAME)
      res.status(200).json({ success: true })
    })
  } catch (error) {
    return next(error)
  }
}
