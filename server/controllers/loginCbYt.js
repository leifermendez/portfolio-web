/* eslint-disable no-underscore-dangle */
const youtubeProvider = require('../services/oauth.yt')
const {db} = require('../services/dbHandler')
const {postFb} = require('../services/postFanPage')
const {checkSub} = require('../services/checkSubscription')
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
const loginCbYt = async (req, res, next) => {
  return youtubeProvider(req).authenticate(
    'youtube',
    {failureRedirect: '/'},
    async (rq, rs) => {
      try {
        console.log(rq.accessToken)
        if (rq.accessToken) {
          const subData = await checkSub(rq.accessToken)
          console.log(subData.data)
          const isSub = subData.data.items.shift() || {id: 0};
          const {state} = req.query;
          console.log('****', req.query)
          const objQuery = getUrlParams(state);
          console.log(objQuery)
          // const token = await generate({id: idFb, avatar: avatar, name: dataJson.name})
          res.redirect(`${process.env.FRONT_URL}/test/${objQuery.course}/${objQuery.test}?sub_confirmation=${isSub.id}`)
        } else {
          console.log('** ERROR **')
          res.redirect('/')
        }
      } catch (e) {
        console.log(e.response.data)
        res.redirect(`${process.env.FRONT_URL}?error_login=youtube`)
      }
    }
  )(req, res, next)
}

module.exports = {loginCbYt}
