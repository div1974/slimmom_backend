const { User } = require('../schemas')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
  constructor() {
    this.model = User
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token })
  }

  async login(login, password) {
    const user = await this.model.findOne({ login })
    const passwordIsValid = await user.validPassword(password)
    if (!user || !passwordIsValid) {
      return
    }
    const id = user.id
    const payload = { id }
    // console.log('Payload', payload)
    const token = await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' })
    const verifyToken = jwt.verify(token, JWT_SECRET_KEY)
    console.log(verifyToken)
    if (verifyToken) {
      await this.updateToken(id, token)
      // console.log('Payload', payload)
      // console.log('Token', token)
    }
    // console.log(user)
    return token
  }
}

module.exports = AuthService
