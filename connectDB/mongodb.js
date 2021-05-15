const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const DB_HOST = process.env.DB_HOST

const connection = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

// Событие при нажатии ctrl + c
process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected and terminated')
    process.exit(1)
  })
})

module.exports = connection
