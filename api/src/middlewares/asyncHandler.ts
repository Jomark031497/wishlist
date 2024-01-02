import type { NextFunction, Request, Response } from 'express'

export function asyncHandler<T>(asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await asyncFn(req, res, next)
      return result
    } catch (error) {
      return next(error)
    }
  }
}
