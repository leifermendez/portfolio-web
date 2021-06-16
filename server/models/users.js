const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    lastName: {
      type: String
    },
    avatar: {
      type: String
    },
    emails: {
      type: String,
      required: true
    },
    ytToken: {
      type: String,
      select: false
    },
    fbToken: {
      type: String,
      select: false
    },
    isSub: {
      type: Boolean
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('users', UserSchema)
