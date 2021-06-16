/* eslint-disable no-underscore-dangle */
const youtubeProvider = require('../services/oauth.yt')
const {dbMergeDataYt, dbFindUser} = require('../services/dbHandler')
const {checkSub, checkUser} = require('../services/checkSubscription')
const {generate} = require('../services/generateToken')


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
        if (rq.accessToken) {
          const subData = await checkSub(rq.accessToken)
          const userDataRaw = await checkUser(rq.accessToken)
          const userData = {...userDataRaw.data, ...{name: rq.profile.displayName}}
          const isSub = subData.data.items.shift() || {id: 0};
          const newData = await dbMergeDataYt({...userData, ...{ytToken: rq.accessToken, isSub: isNaN(isSub.id)}})
          const {state} = req.query;
          const objQuery = getUrlParams(state);
          const token = await generate(newData)
          res.redirect(`${process.env.FRONT_URL}/callback?provider=youtube&tok=${token}&action=test&course=${objQuery.course}&test=${objQuery.test}&sub_confirmation=${isSub.id}`)
          // res.redirect(`${process.env.FRONT_URL}/test/${objQuery.course}/${objQuery.test}?sub_confirmation=${isSub.id}`)
        } else {
          console.log('** ERROR **')
          res.redirect('/')
        }
      } catch (e) {
        console.log(e)
        res.redirect(`${process.env.FRONT_URL}?error_login=youtube`)
      }
    }
  )(req, res, next)
}

module.exports = {loginCbYt}
