const { UserDay, Food } = require('../schemas')
const dayjs = require('dayjs')

class EatenProductDay {
  constructor() {
    this.modelUserDay = UserDay
    this.modelFood = Food
  }

  async getProductById(productId) {
    const product = await this.modelFood.findOne({ _id: productId })
    // console.log('product', product)
    return product
  }

  async addProduct(owner, product, day, weight) {
    const { _id, title, calories } = product
    const convertedCalories = calories * (weight / 100)
    const formatDay = dayjs(day).format('YYYY-MM-DD')
    const userDay = {
      day: formatDay,
      foods: [
        {
          _id: _id,
          title: {
            ua: title.ua,
            ru: title.ru,
          },
          weight: weight,
          cal: convertedCalories,
        }
      ],
      owner
    }
    const checkDay = await this.modelUserDay.findOne({ day })
    if (checkDay) {
      // const product = await this.modelUserDay.updateOne({ _id: checkDay._id }, { [updateKey]: updateValue })
    }
    const products = await this.modelUserDay
      .create(userDay)
    return products
  }
}

module.exports = EatenProductDay
