const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:foodName', async (req, res, next) => {
  res.json({ message: 'template message' })
})