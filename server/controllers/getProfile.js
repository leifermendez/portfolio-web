const {db} = require('../services/dbHandler')
const {decodeToken} = require('../services/generateToken')


const getProfile = async (req, res) => {
  let tokenHeader = req.headers.authorization || '';
  tokenHeader = tokenHeader.split(' ').pop();

  const {data} = await decodeToken(tokenHeader) || {data: null}
  const dataRaw = db.get('users').find({id: data.id}) || {};


  res.send(dataRaw)
}

module.exports = {getProfile}
