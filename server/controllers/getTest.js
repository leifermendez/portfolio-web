const {db, getCTATest} = require('../services/dbHandler')
const {postFb} = require('../services/postFanPage')
const {checkIfExist, insertPost} = require('../services/dbHandler')
const {extraJwt, decodeToken} = require('../services/generateToken')

const getCTA = () => {

}

const getTest = async (req, res) => {
  const {query} = req; //idTest
  const token = extraJwt(req);
  const idTest = query.idTest;
  let comment;
  const user = await decodeToken(token)
  const dataUser = user.data;
  if (dataUser && dataUser.name && query.post) {
    const getId = checkIfExist({id: dataUser.id})
    if (!getId) {
      comment = await postFb({
        dataJson: {
          first_name: dataUser.name
        },
        id: idTest
      });

      insertPost({id: dataUser.id, comment: comment})
    } else {
      comment = {
        res: {
          id: getId?.comment?.res?.id
        }
      }
    }
  }

  const dataRaw = db.get('tests').find({id: idTest}).value() || {};
  const dataParticipants = db.get('participants').filter({test: idTest}).values() || [];
  const ctaFB = getCTATest(idTest)
  const commentIdRes = comment?.res?.id.split('_').pop() || null;
  comment = `${ctaFB?.url}?comment_id=${commentIdRes}`
  res.send({...dataRaw, ...{participants: dataParticipants}, ...{comment}})
}

module.exports = {getTest}
