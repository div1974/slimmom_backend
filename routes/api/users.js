const express = require('express')
const router = express.Router()

const controllerUser = require('../../src/controllers/controllerUser')

router.post('/signup', controllerUser.signup)

router.post('/login', controllerUser.login)

router.post('/logout', controllerUser.logout)

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
