const {newUser} = require('../services/dbHandler')
const {generate} = require('../services/generateToken')

const loginEmail = async (req, res, next) => {
  const {body} = req;
  const data = {
    "dataJson":{
      "first_name": "",
      "last_name": "",
    },
    "emailsArray": [body.email],
    "ytToken": null,
    "fbToken": null,
    "isSub": false
  };

  newUser(data)
  const token = await generate(data)
  res.send({token, data})
}

module.exports = {loginEmail}
