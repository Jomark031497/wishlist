import type { Request, Response, NextFunction } from 'express'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next() // user is logged in
  }

  res.redirect(`${process.env.CLIENT_URL}/login`)
}
