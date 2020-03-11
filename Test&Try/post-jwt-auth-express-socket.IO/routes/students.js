const router = require('express').Router()
const passport = require('../config/auth')
const { Batch, User } = require('../models')
const utils = require('../lib/utils')

const authenticate = passport.authorize('jwt', { session: false })

const loadBatch = (req, res, next) => {
  const id = req.params.id

  Batch.findById(id)
    .then((batch) => {
      req.batch = batch
      next()
    })
    .catch((error) => next(error))
}

const getStudents = (req, res, next) => {
  Promise.all(req.batch.students.map(student))
    .then((student) => {
        return {
          name: student.name,
          photo: student.photo,
          evaluation: [],
          lastColor: student.lastColor
        }
      next()
    })
    .catch((error) => next(error))
}

module.exports = io => {
  router
  .get('/batches/:id/students', loadBatch, getStudents, (req, res, next) => {
      if (!req.batch || !req.students) { return next() }
      res.json(req.students)
    })

    .post('/batches/:id/students', authenticate, loadBatch, (req, res, next) => {
      const newStudent = {
        name: req.body.name,
        photo: req.body.photo,
        evaluation: [
          {
            color: null,
            date: null,
            remark: null
          }
        ],
          lastColor: req.body.lastColor

      }

      req.batch.students = [...req.batch.students, newStudent]

      req.batch.save()
        .then((batch) => {
          req.batch = batch
          next()
        })
        .catch((error) => next(error))
    },
    (req, res, next) => {
      io.emit('action', {
        type: 'BATCH_STUDENTS_UPDATED',
        payload: {
          batch: req.batch,
          students: req.students
        }
      })
      res.json(req.students)
    })

    .delete('/batches/:id', authenticate, (req, res, next) => {
      if (!req.batch) { return next() }

      req.batch.students = req.batch.students.filter((p) => p.userId.toString() !== userId.toString())
      req.batch.save()
        .then((batch) => {
          req.batch = batch
          next()
        })
        .catch((error) => next(error))

    },
    (req, res, next) => {
      io.emit('action', {
        type: 'BATCH_STUDENTS_UPDATED',
        payload: {
          batch: req.batch,
          students: req.students
        }
      })
      res.json(req.students)
    })

  return router
}
