const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./data/db.json')
const db = low(adapter)
db.defaults({
  users: [],
  tests: [],
}).write();


const newUser = (data) => {
  const checkUser = db.get('users')
    .find({id: data.idFb})
    .value();

  if (!checkUser) {
    db.get('users')
      .push({
        id: data.idFb,
        name: data.dataJson.first_name,
        lastName: data.dataJson.last_name,
        avatar: data.avatar,
        emails: data.emailsArray.find(() => true)
      })
      .write();
  }
}

const saveTest = (data) => {
  const checkTest = db.get('tests')
    .find({userId: data.id})
    .value();

  if (!checkTest) {
    db.get('tests')
      .push({
        userId: data.id,
        course:data.course,
        avatar: data.avatar,
        testId:data.test
      })
      .write();
  }
}

module.exports = {db, newUser, saveTest}
