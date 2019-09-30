const mongoose = require('mongoose');

const ArticlesSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Articles = mongoose.model('articles', ArticlesSchema);
