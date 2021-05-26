const { ProductsServices } = require('../services')
const calculator = require('../helpers/calculator')

const productsServices = new ProductsServices()

const getDailyCalories = async (req, res, next) => {
  try {
    const { body } = req
    const calories = await calculator(body)
    res.status(200).json({
      status: 'Success',
      code: 200,
      message: 'Recommended daily calories intake',
      calories,
    })
  } catch (error) {
    next(error)
  }
}

const getProducts = async (req, res, next) => {
  try {
    const { groupBloodNotAllowed } = req.body
    const { query } = req
    const products = await productsServices.getNotRecProducts(groupBloodNotAllowed, query)
    res.status(200).json({
      status: 'Success',
      code: 200,
      message: 'Not recommended products',
      ...products
    })
  } catch (error) {
    next(error)
  }
}

const getProductsByQuery = async (req, res, next) => {
  const { name } = req.query
  const { query } = req
  try {
    const result = await productsServices.getProductsByQuery(name, query)
    const products = await result.map(product => product.title)
    if (!name) {
      return res.status(204).json({
        status: 'Success',
        code: 204,
        message: 'Product not found',
        products: {}
      })
    }
    res.status(200).json({
      status: 'Success',
      code: 200,
      message: 'Product found',
      products
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getDailyCalories,
  getProducts,
  getProductsByQuery,
}
