const {dbGetMembers} = require('../services/dbHandler')

const getMembers = (req, res) => {
  const data = dbGetMembers() || []
  res.send({data})
}

module.exports = {getMembers};
