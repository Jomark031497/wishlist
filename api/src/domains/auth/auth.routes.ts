import { Router } from 'express'
import passport from 'passport'
import { requireAuth } from '../../middlewares/requireAuth.js'
import { __CLIENT_URL__, __COOKIE_NAME__ } from '../../constants.js'

const router = Router()

router.get('/google', (req, res, next) => {
  passport.authenticate('google')(req, res, next)
})

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${__CLIENT_URL__}/login`,
    successRedirect: __CLIENT_URL__,
  }),
)

router.get(
  '/azure',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: `${__CLIENT_URL__}/login`,
    successRedirect: __CLIENT_URL__,
  }),
)

router.post('/azure/callback', (req, res, next) => {
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: `${__CLIENT_URL__}/login`,
    successRedirect: __CLIENT_URL__,
  })(req, res, next)
})

router.get('/logout', function (req, res) {
  req.session.destroy((err) => {
    if (err) return res.redirect(`${__CLIENT_URL__}/login`)
    res.clearCookie(__COOKIE_NAME__)
    res.redirect(`${__CLIENT_URL__}/login`)
  })
})

router.get('/user', requireAuth, (req, res) => {
  return res.json(req.user)
})

export default router
