const express = require('express')
const router = express.Router()

const controllerUserDay = require('../../src/controllers/controllerUserDay')
const guard = require('../../src/helpers/guard')

router
  .post('/:productId', guard, controllerUserDay.eatenProductPerDay)

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:userId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:userId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.patch('/:userId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
