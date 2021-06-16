const {dbGetCTATest, dbGetTest, dbGetParticipants} = require('../services/dbHandler')

const getTest = async (req, res) => {
  const {query} = req; //idTest
  const idTest = query.idTest;
  let comment
  const dataRaw = await dbGetTest(idTest)
  const dataParticipants = await dbGetParticipants({test: idTest})
  const ctaFB = await dbGetCTATest(idTest)
  const commentIdRes = comment?.res?.id.split('_').pop() || null;
  comment = `${ctaFB?.url}?comment_id=${commentIdRes}`
  // const data =
  res.send({...dataRaw.toObject(), ...{participants: dataParticipants}, ...{comment}})
}

module.exports = {getTest}
