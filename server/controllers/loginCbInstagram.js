/* eslint-disable no-underscore-dangle */
const instagramProvider = require('../services/oauth.instagram')

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
const loginCbInsta = async (req, res, next) => {
  return instagramProvider(req).authenticate(
    'instagram',
    {failureRedirect: '/'},
    async (rq, rs) => {
      console.log(rq, rs)
      if (!rq) {
        // const {emails, name, queryParams, fbToken} = rs
        // const dataJson = rs._json // picture
        // const emailsArray = emails.map((a) => a.value)
        // const avatar = dataJson && dataJson.picture ? dataJson.picture : ''
        // const idFb = rs.id;
        // const data = {idFb, dataJson, avatar, emailsArray, id: idFb, fbToken};
        // newUser(data);
        // // postFb(data)
        //
        // const {state} = queryParams;
        // const objQuery = getUrlParams(state);
        // const token = await generate({id: idFb, avatar: avatar, name: dataJson.name})
        // res.redirect(`${process.env.FRONT_URL}/callback?provider=facebook&tok=${token}&course=${objQuery.course}&action=init`)
      } else {
        console.log('** ERROR **')
        // res.redirect('/')
      }
    }
  )(req, res, next)
}

module.exports = {loginCbInsta}
