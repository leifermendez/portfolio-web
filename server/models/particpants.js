const mongoose = require('mongoose');

const ParticipantsSchema = new mongoose.Schema(
  {
    user_id: {
      type: String
    },
    avatar: {
      type: String
    },
    test: {
      type: String
    },
    name: {
      type: String
    },
    course: {
      type: String
    },
    urlTest: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('participants', ParticipantsSchema)
