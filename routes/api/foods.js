const express = require("express");
const router = express.Router();

// const calculator = require('../../src/controllers/controllersProducts')
const controllerProducts = require("../../src/controllers/controllersProducts");
const { validateCalc } = require("../../src/validation/calculatorValidate");
const guard = require("../../src/helpers/guard");

router
  .post("/", validateCalc, controllerProducts.getCaloriesNotRecProduct)
  // .post(
  //   "/private",
  //   validateCalc,
  //   guard,
  //   controllerProducts.getCaloriesNotRecProduct
  // )
  .get("/foods", controllerProducts.getProductsByQuery);

module.exports = router;
