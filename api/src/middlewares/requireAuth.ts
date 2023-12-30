import { NextFunction, Request, Response } from 'express'

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: 'Unauthenticated' })

  return next()
}
