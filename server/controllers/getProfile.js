const {db} = require('../services/dbHandler')
const {decodeToken, extraJwt} = require('../services/generateToken')


const getProfile = async (req, res) => {
  const tokenHeader = extraJwt(req);
  const {data} = await decodeToken(tokenHeader) || {data: null}
  const dataRaw = db.get('users')
      .find({id: data.id})
      .omit(['ytToken','fbToken','emails']) || {};



  res.send(dataRaw)
}

module.exports = {getProfile}
