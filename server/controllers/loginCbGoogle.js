/* eslint-disable no-underscore-dangle */
const googleProvider = require('../services/oauth.google')
const {newUser} = require('../services/dbHandler')
// const {postFb} = require('../services/postFanPage')
// const {checkSub, checkUser} = require('../services/checkSubscription')
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
const loginCbGoogle = async (req, res, next) => {
  return googleProvider(req).authenticate(
    'google',
    {failureRedirect: '/'},
    async (rq, rs) => {
      try {
        if (rq.accessToken) {
          const {emails, name, id, photos} = rq.profile;
          const emailsArray = emails.map((a) => a.value)
          const avatarFromArray = photos.shift();
          const data = {
            id,
            dataJson: {
              first_name: name.familyName,
              last_name: name.givenName,
            },
            avatar: avatarFromArray.value,
            emailsArray
          };

          const newData = newUser(data);
          // postFb(data)

          // const {state} = queryParams;
          // const objQuery = getUrlParams(state);
          const token = await generate(newData)
          res.redirect(`${process.env.FRONT_URL}/callback?provider=google&tok=${token}&action=init`)
        } else {
          console.log('** ERROR **')
          // res.redirect('/')
        }
      } catch (e) {
        console.log(e)
        // res.redirect(`${process.env.FRONT_URL}?error_login=youtube`)
      }
    }
  )(req, res, next)
}

module.exports = {loginCbGoogle}
