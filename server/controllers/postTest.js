const {db , saveTest} = require('../services/dbHandler')


const postTest = async (req, res) => {
  const {body} = req;
  console.log(body)
  saveTest(body)
  res.send({save:'success'})
}

module.exports = {postTest}
