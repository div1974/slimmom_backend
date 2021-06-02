const express = require('express')
const router = express.Router()

const controllerUser = require('../../src/controllers/controllerUser') 
// const { validateAuth } = require('../../src/validation/authenticationValidate')
const guard = require('../../src/helpers/guard')

router.post('/signup', controllerUser.signup)

router.post('/login', controllerUser.login)

router.post('/logout', guard, controllerUser.logout)
router.patch('/priv', guard, controllerUser.updCalNotRecFoods)

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
