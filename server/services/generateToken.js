const jwt = require('jsonwebtoken');

const generate = (user) => {
  return new Promise((resolve, reject) => {
    try{
      const token = jwt.sign({
        iss: 'LeiferMendez',
        data: user,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
      }, process.env.JWT_SECRET);
      resolve(token)
    }catch (e) {
      reject(null)
    }
  })
}

const decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    try{
      const tokenDecode = jwt.decode(token);
      resolve(tokenDecode)
    }catch (e) {
      reject(null)
    }
  })

}

module.exports = {generate ,decodeToken}
