const instagramProvider = require('../services/oauth.instagram')

const loginInsta = (req, res, next) => {
  // ------>>> Guardamos en cookie desde donde nos pidieron el login "app_1.0"
  const { query } = req
  console.log(query)
  const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
  // const { tenant } = query
  // res.cookie('tenant', tenant, { expire: new Date() + 9999 })
  return instagramProvider(req).authenticate('instagram', {
    scope: ['user_profile'],
    state: `?${queryString}`
  })(req, res, next)
}

module.exports = {loginInsta}
