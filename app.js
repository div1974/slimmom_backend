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
  res.status(404).json({
    status: 'Error',
    code: 404,
    message: 'Not found such page or route'
  })
})

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'Error',
    code: 500,
    message: err.message
  })
  // err.status = err.status ? err.status : 500
  // res.status(err.status).json({
  //   status: err.status === 500 ? 'Fail' : 'Error',
  //   code: err.status,
  //   message: err.message,
  //   data: err.status === 500 ? 'Internal Server Error' : err.data
  // })
})

module.exports = app
