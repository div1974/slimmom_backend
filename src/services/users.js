const { User } = require('../schemas')

class UserService {
  constructor() {
    this.model = User
  }

  async createUserRegistry(body) {
    const user = await this.model(body)
    user.setPassword(body.password)
    const userSaveInDB = user.save()
    return userSaveInDB
  }

  async findByEmail(login) {
    const userByEmail = await this.model.findOne({ login })
    console.log('login', login)
    console.log('userByEmail', userByEmail)
    return userByEmail
  }
}

module.exports = UserService
