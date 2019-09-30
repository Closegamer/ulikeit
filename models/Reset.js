const mongoose = require('mongoose');

const ResetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users'
    },
    resetToken: {
      type: String,
      required: true,
      unique: true
    }
  },
  { versionKey: false }
);

module.exports = Reset = mongoose.model('reset', ResetSchema);
