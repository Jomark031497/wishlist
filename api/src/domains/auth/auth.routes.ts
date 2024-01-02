import { Router } from 'express'
import passport from 'passport'
import { requireAuth } from '../../middlewares/requireAuth.js'

const router = Router()

router.get('/protected', requireAuth, (req, res) => {
  res.send({ accessible: true, user: req.user })
})

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    successRedirect: process.env.CLIENT_URL,
  }),
)

router.get('/google', passport.authenticate('google'))

router.get('/azure', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }))

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) return res.redirect('/')
    res.clearCookie('sid')
    res.redirect('/')
  })
})

router.get('/user', (req, res) => {
  return res.json(req.user)
})

export default router
