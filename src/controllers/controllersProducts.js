const { ProductsServices } = require('../services')
const calculator = require('../helpers/calculator')

const productsServices = new ProductsServices()

const getCaloriesNotRecProduct = async (req, res, next) => {
  try {
    const { body } = req
    const { groupBloodNotAllowed } = req.body
    const { query } = req
    const calories = await calculator(body)
    const products = await productsServices.getNotRecProducts(groupBloodNotAllowed, query)
    const notRecProducts = await products.map(product => ({
      id: product._id, title: product.title, calories: product.calories
    }))
    res.status(200).json({
      status: 'Success',
      code: 200,
      message: 'Daily calories and not recommended products',
      products: {
        dailyCalories: calories,
        notRecProducts
        // notRecProducts: products._id,
        // title: products.title

      }
      // products
    })
  } catch (error) {
    next(error)
  }
}

// const getProducts = async (req, res, next) => {
//   try {
//     const { groupBloodNotAllowed } = req.body
//     const { query } = req
//     const products = await productsServices.getNotRecProducts(groupBloodNotAllowed, query)
//     res.status(200).json({
//       status: 'Success',
//       code: 200,
//       message: 'Not recommended products',
//       ...products
//     })
//   } catch (error) {
//     next(error)
//   }
// }

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
  getCaloriesNotRecProduct,
  // getProducts,
  getProductsByQuery,
}
