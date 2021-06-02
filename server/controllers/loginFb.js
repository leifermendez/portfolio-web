const facebookProvider = require('../services/oauth.facebook')

const loginFb = (req, res, next) => {
  // ------>>> Guardamos en cookie desde donde nos pidieron el login "app_1.0"
  const { query } = req
  console.log(query)
  const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
  // const { tenant } = query
  // res.cookie('tenant', tenant, { expire: new Date() + 9999 })
  return facebookProvider(req).authenticate('facebook', {
    scope: ['public_profile', 'email'],
    state: `?${queryString}`
  })(req, res, next)
}

module.exports = {loginFb}
