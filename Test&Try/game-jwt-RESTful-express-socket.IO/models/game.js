// models/game.js
const mongoose = require('../config/database')
const { Schema } = mongoose



const playerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  symbol:{ type: String}, 
});

const gameSchema = new Schema({
  players: [playerSchema],
  started: { type: Boolean, default: false },
  winnerId: { type: Schema.Types.ObjectId, ref: 'users' },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  draw: { type:Boolean, default: false},
  // rounds: {type:[[String]], default: []},
});

module.exports = mongoose.model('games', gameSchema)
