/* eslint-disable no-underscore-dangle */
const facebookProvider = require('../services/oauth.facebook')
const {generate} = require('../services/generateToken')
const {dbNewUser} = require('../services/dbHandler')

const getUrlParams = (search) => {
  const hashes = search.slice(search.indexOf('?') + 1).split('&')
  const params = {}
  hashes.map(hash => {
    const [key, val] = hash.split('=')
    params[key] = decodeURIComponent(val)
  })
  return params
}

/**
 * Login Facebook Callback
 */
const loginCbFb = async (req, res, next) => {
  return facebookProvider(req).authenticate(
    'facebook',
    {failureRedirect: '/'},
    async (rq, rs) => {
      if (!rq) {
        const {emails, name, queryParams, fbToken} = rs
        const dataJson = rs._json // picture
        const emailsArray = emails.map((a) => a.value)
        const avatar = dataJson && dataJson.picture ? dataJson.picture : ''
        const idFb = rs.id;
        const data = {idFb, dataJson, avatar, emailsArray, id: idFb, fbToken};
        const newData = await dbNewUser(data);
        // postFb(data)

        const {state} = queryParams;
        const objQuery = getUrlParams(state);
        const token = await generate(newData)
        res.redirect(`${process.env.FRONT_URL}/callback?provider=facebook&tok=${token}&course=${objQuery.course}&action=init`)
      } else {
        console.log('** ERROR **')
        res.redirect('/')
      }
    }
  )(req, res, next)
}

module.exports = {loginCbFb}
