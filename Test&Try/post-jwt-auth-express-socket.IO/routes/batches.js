// routes/batches.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Batch } = require('../models')
const utils = require('../lib/utils')

const authenticate = passport.authorize('jwt', { session: false })

module.exports = io => {
  router
    .get('/batches', (req, res, next) => {
      Batch.find()
        // Newest batches first
        .sort({ createdAt: -1 })
        // Send the data in JSON format
        .then((batches) => res.json(batches))
        // Throw a 500 error if something goes wrong
        .catch((error) => next(error))
    })
    .get('/batches/:id', (req, res, next) => {
      const id = req.params.id

      Batch.findById(id)
        .then((batch) => {
          if (!batch) { return next() }
          res.json(batch)
        })
        .catch((error) => next(error))
    })
    .post('/batches', authenticate, (req, res, next) => {
      const newBatch = {
        ...req.body
      }

      Batch.create(newBatch)
        .then((batch) => {
          io.emit('action', {
            type: 'BATCH_CREATED',
            payload: batch
          })
          res.json(batch)
        })
        .catch((error) => next(error))
    })
    // .patch('/batches/:id', authenticate, (req, res, next) => {
    //   const id = req.params.id
    //   const userId = req.account._id.toString()
    //
    //   Batch.findById(id)
    //     .then((batch) => {
    //       if (!batch) { return next() }
    //
    //       // const updatedBatch = processMove(batch, req.body, userId)
    //
    //       Batch.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
    //         .then((batch) => {
    //           io.emit('action', {
    //             type: 'BATCH_UPDATED',
    //             payload: batch
    //           })
    //           res.json(batch)
    //         })
    //         .catch((error) => next(error))
    //     })
    //     .catch((error) => next(error))
    // })
    // .delete('/batches/:id', authenticate, (req, res, next) => {
    //   const id = req.params.id
    //   Batch.findByIdAndRemove(id)
    //     .then(() => {
    //       io.emit('action', {
    //         type: 'BATCH_REMOVED',
    //         payload: id
    //       })
    //       res.status = 200
    //       res.json({
    //         message: 'Removed',
    //         _id: id
    //       })
    //     })
    //     .catch((error) => next(error))
    // })

  return router
}
