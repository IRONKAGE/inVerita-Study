const Router = require('koa-router')
const router = new Router()
const { UserController, TaskController, PostController } = require('../controllers')


// User routes
router
  .post('/signup', UserController.signUp)  
  .post('/signin', UserController.signIn)

// Task routes
router
  .post('/task', UserController.restrictToAuth, TaskController.create)
  .get('/task/:taskId', UserController.restrictToAuth, TaskController.getById)
  .get('/tasks', UserController.restrictToAuth, TaskController.getAll)
  .get('/tasks/:author', UserController.restrictToAuth, TaskController.getByAuthor)
  
// Game routes
router
  .get('/posts', UserController.restrictToAuth, PostController.getAll)
  .post('/post', UserController.restrictToAuth, PostController.create)


module.exports = router