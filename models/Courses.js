const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
  humanId: {
    type: Number,
    required: true,
    unique: true
  },
  caption: {
    type: String,
    required: true
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

module.exports = Courses = mongoose.model('courses', CoursesSchema);
