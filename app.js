const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const foodsRouter = require('./routes/api/foods')
const usersRouter = require('./routes/api/users')
const usersDaysRouter = require('./routes/api/usersDays')
const path = require('path')
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.static(path.join(process.cwd(), 'public')))

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(passport.initialize())

app.use('/api/users', usersRouter)
app.use('/api/products', foodsRouter)
app.use('/api/usersDays', usersDaysRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
