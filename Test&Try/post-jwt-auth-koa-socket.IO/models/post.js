const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  task: {
    type: Schema.Types.Mixed
  }

}, {
  collection: 'Posts'
})

module.exports = mongoose.model('Post', postSchema)