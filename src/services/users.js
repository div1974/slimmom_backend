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
    return userByEmail
  }

  async findById(contactId) {
    const userById = await this.model.findOne({ _id: contactId })
    return userById
  }

  async updateUser (id, updateKey, updateValue) {
    return this.model.updateOne({ _id: id }, { [updateKey]: updateValue })
  }
}

module.exports = UserService
