const {dbGetProfile} = require('../services/dbHandler')
const {decodeToken, extraJwt} = require('../services/generateToken')


const getProfile = async (req, res) => {
  const tokenHeader = extraJwt(req);
  const {data} = await decodeToken(tokenHeader);
  const dataRaw = await dbGetProfile(data)

  res.send(dataRaw)
}

module.exports = {getProfile}
