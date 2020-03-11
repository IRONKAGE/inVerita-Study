const { PostModel } = require('../models')

module.exports = {
  create: async (ctx) => {
    try {
      const author = ctx.user.username
      const { text, task } = ctx.request.body
        
      const post = await PostModel.create({ author, text, task })  

      ctx.status = 201
      ctx.body = { post }
    } catch (e) {
      ctx.throw(500, e)
    }
  },
  getAll: async (ctx) => {
    try {
      const posts = await PostModel.find().sort({ created: 'desc' }).exec()

      ctx.status = 200
      ctx.body = { posts }
    } catch (e) {
      ctx.throw(500, e)
    }
  }
}