const {dbGetMembers} = require('../services/dbHandler')

const getMembers = async (req, res) => {
  const data = await dbGetMembers();
  res.send({data})
}

module.exports = {getMembers};
