import { Router } from 'express'
import passport from 'passport'
import { requireAuth } from '../../middlewares/requireAuth.js'

const router = Router()

router.get('/google', (req, res, next) => {
  passport.authenticate('google')(req, res, next)
})

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    successRedirect: process.env.CLIENT_URL,
  }),
)

router.get(
  '/azure',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    successRedirect: process.env.CLIENT_URL,
  }),
)

router.post('/azure/callback', (req, res, next) => {
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    successRedirect: process.env.CLIENT_URL,
  })(req, res, next)
})

router.get('/logout', function (req, res) {
  req.session.destroy((err) => {
    if (err) return res.redirect(`${process.env.CLIENT_URL}/login`)
    res.clearCookie('sid')
    res.redirect(`${process.env.CLIENT_URL}/login`)
  })
})

router.get('/user', requireAuth, (req, res) => {
  return res.json(req.user)
})

export default router
