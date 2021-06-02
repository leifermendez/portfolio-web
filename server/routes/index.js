const express = require('express')
const {loginFb} = require('../controllers/loginFb')
const {loginYt} = require('../controllers/loginYt')
const {loginCbFb} = require('../controllers/loginCbFb')
const {loginCbYt} = require('../controllers/loginCbYt')
const {getParticipants} = require('../controllers/getParticipants')
const {getProfile} = require('../controllers/getProfile')
const {getTest} = require('../controllers/getTest')
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
  '/login-google',
  loginYt
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

router.post(
  '/send-test',
  postTest
)

module.exports = router
