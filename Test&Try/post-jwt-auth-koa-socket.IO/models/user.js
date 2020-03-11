const mongoose = require('mongoose')
const bcrypt  = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  username: { 
    type: String, 
    alphanum: true, 
    unique: true,
    lowercase: true, 
    requried: true 
  },
  password: { 
    type: String, 
    select: false,
    required: true 
  }
}, {
  collection: 'Users'
})

userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(this.password, salt)
      this.password = hash
      return next()
    } else {
      return next()
    }
  } catch (e) {
    next(e)
  }
})

userSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (e) {
    throw e
  }
}

module.exports = mongoose.model('User', userSchema)