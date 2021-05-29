const Food = require('../schemas/food')

class Products {
  constructor() {
    this.model = Food
  }

  async getNotRecProducts(groupBloodNotAllowed, query) {
    const { page = 1, limit = 5 } = query
    const { docs: products, totalDocs: total } = await this.model
      .paginate(
        { groupBloodNotAllowed },
        {
          limit,
          page,
          select: 'title'
        }
      )
    return { products, total, limit: Number(limit), page: Number(page) }
  }

  // async getNotRecProducts(groupBloodNotAllowed, query) {
  //   const { page = 1, limit = 5 } = query
  //   const notRecomendedProducts = await this.model.find({ groupBloodNotAllowed })
  //     .limit(limit * 1).skip((page - 1) * limit)
  //   return notRecomendedProducts
  // }

  async getProductsByQuery(name, query) {
    const { page = 1, limit = 5 } = query
    const products = await this.model
      .find(
        {
          'title.ua': { $regex: name, $options: `/${name}/i` },
          'title.ru': { $regex: name, $options: `/${name}/i` }
        }
      )
      .limit(limit * 1).skip((page - 1) * limit)
      .sort({ 'title.ua': 1, 'title.ru': 1 })
    return products
  }
}

module.exports = Products
