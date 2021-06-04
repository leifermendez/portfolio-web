const {db} = require('../services/dbHandler')


const getTest = async (req, res) => {
  const {query} = req; //idTest
  console.log('-->', query)
  const dataRaw = db.get('tests').find({id: query.idTest}).value() || {};
  const dataParticipants = db.get('participants').filter({test: query.idTest}).values() || [];
  res.send({...dataRaw, ...{participants: dataParticipants}})
}

module.exports = {getTest}
