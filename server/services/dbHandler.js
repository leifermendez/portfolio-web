const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./data/db.json')
const db = low(adapter)
db.defaults({
  users: [],
  tests: [],
  ctaFb: [],
  participants: []
}).write();


const newUser = (data) => {
  const emails = data.emailsArray.shift();
  const checkUser = db.get('users')
    .find({emails: emails})
    .value();

  if (!checkUser) {
    db.get('users')
      .push({
        id: data.idFb,
        name: data.dataJson.first_name,
        lastName: data.dataJson.last_name,
        avatar: data.avatar,
        emails: emails,
        ytToken: data.ytToken || null,
        fbToken: data.fbToken || null,
        isSub: null
      })
      .write();
  } else {
    db.get('users')
      .assign({avatar: data.avatar, fbToken: data.fbToken})
      .value();
  }
}

const findUser = (email) => {
  return db.get('users')
    .find({emails: email})
    .value();
}

const saveParticipants = (data) => {
  console.log('--->', data)
  const checkTest = db.get('participants')
    .find(p => p.user_id === data.user_id && p.test === data.test)
    .value();

  console.log('+++', checkTest)
  if (!checkTest) {
    db.get('participants')
      .push(data)
      .write();
  }
}

const mergeDataYt = (data) => {

  const checkUser = db.get('users')
    .find({emails: data.email})
    .value();

  if (checkUser) {
    db.get('users')
      .find({emails: data.email})
      .assign({ytToken: data.ytToken, isSub: data.isSub})
      .write();
  } else {
    data.emailsArray = [data.email];
    data.dataJson = {
      first_name: data.name,
      last_name: ''
    }
    newUser(data)
  }
}

module.exports = {db, newUser, saveParticipants, mergeDataYt, findUser}
