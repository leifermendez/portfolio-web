const {dbNewUser} = require('../services/dbHandler')
const {generate} = require('../services/generateToken')

const loginEmail = async (req, res, next) => {
  const {body} = req;
  const data = {
    "dataJson":{
      "first_name": "Anónimo",
      "last_name": "",
    },
    "emailsArray": [body.email],
    "ytToken": null,
    "fbToken": null,
    "isSub": false
  };

  const newData = await dbNewUser(data)
  const token = await generate(newData)
  res.send({token, data})
}

module.exports = {loginEmail}
