const { UserDay, Food } = require('../schemas')

class EatenProductDay {
  constructor() {
    this.modelUserDay = UserDay
    this.modelFood = Food
  }

  async getProductById(productId) {
    const product = await this.modelFood.findOne({ _id: productId })
    console.log('product', product)
    return product
  }
}

module.exports = EatenProductDay
