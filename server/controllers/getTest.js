const {db} = require('../services/dbHandler')


const getTest = async (req, res) => {
  const dataRaw = db.get('tests').values() || [];
  res.send(dataRaw)
}

module.exports = {getTest}
