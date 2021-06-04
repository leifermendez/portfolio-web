/* eslint-disable no-underscore-dangle */
const facebookProvider = require('../services/oauth.facebook')
const {db} = require('../services/dbHandler')
const {postFb} = require('../services/postFanPage')
const {generate} = require('../services/generateToken')
const {newUser} = require('../services/dbHandler')

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
        // console.log(dataJson, avatar, idFb, emailsArray)
        const data = {idFb, dataJson, avatar, emailsArray, id: idFb, fbToken};
        newUser(data);
        // postFb(data)
        //     .then(response => {
        //         const {id} = response.res || {id: null}
        //         const idParse = id.split('_').reverse();
        //         console.log(response)
        //         res.redirect(`${process.env.FRONT_URL}?show_comment=${idParse[0]}&id=${idFb}`)
        //     }).catch(err => {
        //     res.redirect('/?error=true')
        // })
        const {state} = queryParams;
        const objQuery = getUrlParams(state);
        // console.log(objQuery)
        const token = await generate({id: idFb, avatar: avatar, name: dataJson.name})
        res.redirect(`${process.env.FRONT_URL}/callback?provider=facebook&tok=${token}&course=${objQuery.course}&action=init`)
      } else {
        console.log('** ERROR **')
        res.redirect('/')
      }
    }
  )(req, res, next)
}

module.exports = {loginCbFb}
