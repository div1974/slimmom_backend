const { EatenProductDayService } = require("../services");
// const { UserDay } = require('../schemas')
const eatenProduct = new EatenProductDayService();
// const productService = new ProductsServices()
// const userService = new UserService()

const eatenProductPerDay = async (req, res, next) => {
  // const food = UserDay.find()
  const owner = req.user._id;
  // const { name } = req.query
  const { productId } = req.params;
  const { day, weight /*calories*/ } = req.body;
  try {
    const product = await eatenProduct.getProductById(productId);
const calories = product.calories
const user = await eatenProduct.getUserById(owner)
    const addProd = await eatenProduct.addProduct(
      user,
      product,
      day,
      weight,
      calories
    );

    // const updateSummary = await eatenProduct.updateSummary(owner, calories);
    return res.status(201).json({
      status: "Success",
      code: 201,
      message: "Product added successfully",
      addProd,
      // summary
      // updateSummary,
      // product: {
      //   id: product._id,
      //   // date: day,
      //   title: product.title,
      //   weight: weight,
      //   calories: convertedCalories
      // }
    });
  } catch (error) {
    next(
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Product not found",
      })
    );
  }
};

module.exports = {
  eatenProductPerDay,
};
