// models/game.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  color: { type: String },
  date: { type: Date, default: Date.now },
  remark: { type: String }
})

const studentSchema = new Schema({
  name: { type: String},
  photo: { type: String },
  evaluation: [ evaluationSchema ],
  lastColor: { type: String }
})

const batchSchema = new Schema({
  batchNumber: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  students: [ studentSchema ],
  rating:  { type: String }
})

module.exports = mongoose.model('batches', batchSchema)
