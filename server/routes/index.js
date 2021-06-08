const express = require('express')
const {loginFb} = require('../controllers/loginFb')
const {loginYt} = require('../controllers/loginYt')
const {loginInsta} = require('../controllers/loginInstagram')
const {loginGoogle} = require('../controllers/loginGoogle')
const {loginCbFb} = require('../controllers/loginCbFb')
const {loginCbYt} = require('../controllers/loginCbYt')
const {loginCbGoogle} = require('../controllers/loginCbGoogle')
const {loginCbInsta} = require('../controllers/loginCbInstagram')
const {loginEmail} = require('../controllers/loginEmail')
const {getParticipants} = require('../controllers/getParticipants')
const {getProfile} = require('../controllers/getProfile')
const {getTest} = require('../controllers/getTest')
const {getCtaFB} = require('../controllers/ctaFb')
const {postTest} = require('../controllers/postTest')
require('../services/oauth.jwt')
const passport = require('passport')

const router = express.Router()
const requireAuth = passport.authenticate('jwt', {
  session: false
})


router.get(
  '/login-facebook',
  loginFb
)

router.get(
  '/login-instagram',
  loginInsta
)

router.get(
  '/login-google',
  loginGoogle
)

router.get(
  '/login-youtube',
  loginYt
)

router.post(
  '/login-email',
  loginEmail
)

router.get(
  '/callback/facebook',
  loginCbFb
)

router.get(
  '/callback/youtube',
  loginCbYt
)

router.get(
  '/callback/google',
  loginCbGoogle
)

router.get(
  '/callback/instagram',
  loginCbInsta
)

router.get(
  '/participants',
  getParticipants
)

router.get(
  '/profile',
  requireAuth,
  getProfile
)

router.get(
  '/test',
  getTest
)

router.get(
  '/cta-fb',
  getCtaFB
)

router.post(
  '/send-test',
  requireAuth,
  postTest
)

module.exports = router
