const {dbSaveParticipants} = require('../services/dbHandler')
const {decodeToken, extraJwt} = require('../services/generateToken')


const postTest = async (req, res) => {
  const {body} = req;
  const tokenHeader = extraJwt(req);
  const {data} = await decodeToken(tokenHeader) || {data: null}
  const urlEdit = body.urlTest
  const bodyParse = {...{user_id: data.id, avatar: data.avatar,name:data.name, ...body}}
  await dbSaveParticipants(bodyParse)
  res.send({save: 'success'})
}

module.exports = {postTest}
