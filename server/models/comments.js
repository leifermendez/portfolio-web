const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    comment: {
      type: Object
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('comments', CommentsSchema)
