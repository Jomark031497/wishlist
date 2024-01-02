import type { Request, Response, NextFunction } from 'express'
import { CLIENT_URL } from '../constants.js'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next() // user is logged in
  }

  res.redirect(`${CLIENT_URL}/login`)
}
