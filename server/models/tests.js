const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    link: {
      type: String
    },
    name: {
      type: String,
      default: ''
    },
    stack: {
      type: String
    },
    query: {
      type: String
    },
    form: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('tests', TestSchema)
