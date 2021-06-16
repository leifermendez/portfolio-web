const mongoose = require('mongoose');

const CtaFbSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    label: {
      type: String
    },
    action: {
      type: String
    },
    message: {
      type: String
    },
    url: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('ctaFb', CtaFbSchema)
