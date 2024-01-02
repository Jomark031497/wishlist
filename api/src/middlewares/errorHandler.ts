import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/ApiError.js'
import { logger } from '../utils/logger.js'

export const errorHandler = (error: ApiError | Error, _req: Request, res: Response, next: NextFunction) => {
  if (!error) next()

  logger.error(error)

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: error.data,
    })
  }

  return res.status(500).json({ message: 'Something went wrong' })
}
