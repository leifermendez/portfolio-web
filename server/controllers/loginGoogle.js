const googleProvider = require('../services/oauth.google')

const loginGoogle = (req, res, next) => {
  const {query} = req
  const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
  return googleProvider(req).authenticate('google', {
    scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email'],
    state: `?${queryString}`
  })(req, res, next)
}

module.exports = {loginGoogle}
