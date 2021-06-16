const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    topic: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('members', MembersSchema)
