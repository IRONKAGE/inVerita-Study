const { TaskModel } = require('../models')

module.exports = {
  create: async (ctx) => {
    try {
      const author = ctx.user.username
      const { title, words } = ctx.request.body
        
      const task = await TaskModel.create({ author, title, words })  

      ctx.status = 201
      ctx.body = { task }
    } catch (e) {
      ctx.throw(500, e)
    }
  },
  getById: async(ctx) => {
    try {
      const task = await TaskModel.findById(ctx.params.taskId)

      ctx.status = 200
      ctx.body = { task }
    } catch (e) {
      ctx.throw(500, e)
    }
  },
  getByAuthor: async (ctx) => {
    try {
      const tasks = await TaskModel.find({author: ctx.params.author })
      ctx.status = 200
      ctx.body = { tasks }
    } catch (e) {
      ctx.throw(500, e)  
    }
  },
  getAll: async (ctx) => {
    try {
      const tasks = await TaskModel.find().sort({ created: 'desc' }).exec()

      ctx.status = 200
      ctx.body = { tasks }
    } catch (e) {
      ctx.throw(500, e)
    }
  }
}