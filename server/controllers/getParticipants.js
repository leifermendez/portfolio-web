const {dbGetParticipants} = require('../services/dbHandler')

const getParticipants = async (req, res) => {
  const {course} = req.query;
    const data = await dbGetParticipants({course});
    res.send({data})
}

module.exports = { getParticipants }
