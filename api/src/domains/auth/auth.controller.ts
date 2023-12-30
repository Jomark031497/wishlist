import passport from 'passport'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { IVerifyOptions } from 'passport-local'
import { User } from '../users/users.schema.js'

export const loginUserHandler = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', async (err: Error, user: User, info: IVerifyOptions) => {
    try {
      if (err) return next(err)

      if (!user) throw new ApiError(400, info.message)

      req.logIn(user, (err) => {
        if (err) return next(err)
        return res.json(user)
      })
    } catch (error) {
      next(error)
    }
  })(req, res, next) // Invoke the passport authentication strategy
})

export const getAuthenticatedUserHandler = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, 'Unauthorized')
  return res.json(req.user)
})

export const logoutUserHandler = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, 'Unauthorized')
  req.logOut((err) => {
    if (err) throw new ApiError(400, 'Unable to logout')
  })
  return res.json({ success: true, message: 'logout successful' })
})
