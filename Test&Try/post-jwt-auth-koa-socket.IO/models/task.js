const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  words: {
    type: Array,
    lowercase: true,
    required: true
  },
}, {
  collection: 'Tasks'
})

module.exports = mongoose.model('Task', taskSchema)