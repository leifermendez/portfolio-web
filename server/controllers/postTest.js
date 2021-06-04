const {db, saveParticipants} = require('../services/dbHandler')
const {decodeToken, extraJwt} = require('../services/generateToken')


const postTest = async (req, res) => {
  const {body} = req;
  const tokenHeader = extraJwt(req);
  const {data} = await decodeToken(tokenHeader) || {data: null}
  const bodyParse = {...{user_id: data.id, avatar: data.avatar, ...body}}
  saveParticipants(bodyParse)
  res.send({save: 'success'})
}

module.exports = {postTest}
