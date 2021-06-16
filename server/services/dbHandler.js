const User = require('../models/users')
const Participants = require('../models/particpants')
const Comments = require('../models/comments')
const CtaFB = require('../models/ctaFb')
const Members = require('../models/members')
const Tests = require('../models/tests')

const dbNewUser = async (data) => {
  const emails = data.emailsArray.shift();
  const parseData = {
    id: data.idFb,
    name: data.dataJson.first_name,
    lastName: data.dataJson.last_name,
    avatar: data.avatar,
    emails: emails,
    ytToken: data.ytToken || null,
    fbToken: data.fbToken || null,
    isSub: null
  };
  return User.findOneAndUpdate({emails: emails},
    parseData,
    {
      new: true,
      upsert: true
    });
};

const dbFindUser = async (email) => {
  return User.findOne({emails: email});
}

const dbSaveParticipants = async (data) => {
  const {user_id, test} = data;
  return Participants.findOneAndUpdate({
      user_id,
      test
    },
    data,
    {
      new: true,
      upsert: true
    });
};

const dbMergeDataYt = (data) => {
  const {email, isSub, ytToken} = data;
  const parseData = {
    emails: email,
    ytToken,
    isSub
  }

  return User.findOneAndUpdate({emails: email}, parseData, {
    new: true,
    upsert: true
  })
};

const dbCheckIfExist = async ({id}) => {
  return Comments.findOne({id})
}

const dbInsertPost = async ({id, comment}) => {
  return Comments.create({id, comment})
}

const dbGetCTATest = async (action) => {
  return CtaFB.findOne({action})
}

const dbGetMembers = async () => {
  return Members.find({})
}

const dbGetParticipants = async (opt = {}) => {
  return Participants.find(opt)
}

const dbGetProfile = async (data) => {
  return User.findOne({emails: data.emails})
}

const dbGetTest = async (idTest) => {
  return Tests.findOne({id: idTest})
}

module.exports = {
  dbNewUser,
  dbSaveParticipants,
  dbMergeDataYt,
  dbFindUser,
  dbCheckIfExist,
  dbGetCTATest,
  dbInsertPost,
  dbGetMembers,
  dbGetParticipants,
  dbGetProfile,
  dbGetTest
}
