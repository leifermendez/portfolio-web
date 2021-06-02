/* eslint-disable no-underscore-dangle */
const facebookProvider = require('../services/oauth.facebook')
const {db} = require('../services/dbHandler')
const {postFb} = require('../services/postFanPage')
const {generate} = require('../services/generateToken')

const newUser = (data) => {
  const checkUser = db.get('users')
    .find({id: data.idFb})
    .value();

  if (!checkUser) {
    db.get('users')
      .push({
        id: data.idFb,
        name: data.dataJson.first_name,
        lastName: data.dataJson.last_name,
        avatar: data.avatar,
        emails: data.emailsArray.find(() => true)
      })
      .write();
  }


}

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
        const {emails, name, queryParams} = rs
        const dataJson = rs._json // picture
        const emailsArray = emails.map((a) => a.value)
        const avatar = dataJson && dataJson.picture ? dataJson.picture : ''
        const idFb = rs.id;
        // console.log(dataJson, avatar, idFb, emailsArray)
        const data = {idFb, dataJson, avatar, emailsArray, id: idFb};
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
        res.redirect(`${process.env.FRONT_URL}/callback?provider=facebook&tok=${token}&course=${objQuery.course}`)
      } else {
        console.log('** ERROR **')
        res.redirect('/')
      }
    }
  )(req, res, next)
}

module.exports = {loginCbFb}
