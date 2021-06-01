const { EatenProductDayService } = require('../services')
// const { UserDay } = require('../schemas')
const eatenProduct = new EatenProductDayService()
// const productService = new ProductsServices()
// const userService = new UserService()

const eatenProductPerDay = async (req, res, next) => {
  // const food = UserDay.find()
  const owner = req.user._id
  // const { name } = req.query
  const { productId } = req.params
  const { day, weight } = req.body
  try {
    const product = await eatenProduct.getProductById(productId)
    // const convertedCalories = product.calories * (weight / 100)

    const addProd = await eatenProduct.addProduct(owner, product, day, weight)
    console.log('addProd', addProd)
    // if (!product) {
    //   return res.status(404).json({
    //     status: 'Error',
    //     code: 404,
    //     message: 'Product not found'
    //   })
    // }
    return res.status(200).json({
      status: 'Success',
      code: 200,
      message: 'Product was found',
      addProd,
      // product: {
      //   id: product._id,
      //   // date: day,
      //   title: product.title,
      //   weight: weight,
      //   calories: convertedCalories
      // }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  eatenProductPerDay
}
