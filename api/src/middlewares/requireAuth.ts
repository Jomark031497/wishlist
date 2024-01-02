import type { Request, Response, NextFunction } from 'express'
import { __CLIENT_URL__ } from '../constants.js'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next() // user is logged in
  }

  res.redirect(`${__CLIENT_URL__}/login`)
}
