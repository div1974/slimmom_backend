const { EatenProductDayService } = require("../services");
const eatenProduct = new EatenProductDayService();

const eatenProductPerDay = async (req, res, next) => {
  const owner = req.user._id;
  const { productId } = req.params;
  const { day, weight } = req.body;
  try {
    const product = await eatenProduct.getProductById(productId);
    const calories = product.calories;
    const user = await eatenProduct.getUserById(owner);

    if (user.dailyCalorieIntake > 0) {
      const addProd = await eatenProduct.addProduct(
        user,
        product,
        day,
        weight,
        calories
      );
      return res.status(201).json({
        status: "Success",
        code: 201,
        message: `Product id: ${productId} added successfully`,
        addProd,
      });
    } else {
      res.status(400).json({
        status: "Error",
        code: 400,
        message: "Bad request (please calculate field dailyCalorieIntake)",
      });
    }
    // const updateSummary = await eatenProduct.updateSummary(owner, calories);
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

const removeProduct = async (req, res, next) => {
  const owner = req.user._id;
  const { delProductId } = req.params;
  const { day } = req.body;

  try {
    const user = await eatenProduct.getUserById(owner);
    if (user.dailyCalorieIntake > 0) {
      const delProduct = await eatenProduct.removeProductById(
        user,
        delProductId,
        day
      );
      return res.status(200).json({
        status: "Success",
        code: 200,
        message: `Product id: ${delProductId} removed successfully`,
        delProduct,
      });
    } else {
      res.status(400).json({
        status: "Error",
        code: 400,
        message: "Bad request (please calculate field dailyCalorieIntake)",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getUserDayInfo = async (req, res, next) => {
  const owner = req.user._id;
  const { day } = req.body;

  try {
    const user = await eatenProduct.getUserById(owner);
    const findUserByDay = await eatenProduct.findUserDay(user, day);

    if (findUserByDay) {
      return res.status(200).json({
        status: "Success",
        code: 200,
        message: "User's day was found",
        findUserByDay,
      });
    } else {
      res.status(400).json({
        status: "Error",
        code: 400,
        message: "Bad request (User's day not found)",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  eatenProductPerDay,
  removeProduct,
  getUserDayInfo,
};
