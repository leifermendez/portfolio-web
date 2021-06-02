const {db} = require('../services/dbHandler')

const getParticipants = (req, res) => {
    const dataRaw = db.get('users').values() || [];
    const data = dataRaw.map(({avatar}) => {
        return {avatar}
    })

    res.send({data})
}

module.exports = { getParticipants }
