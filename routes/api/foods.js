const express = require('express')
const router = express.Router()

const calculator = require('../../src/controllers/controllersProducts')
const controllerProducts = require('../../src/controllers/controllersProducts')
const { validateCalc } = require('../../src/validation/calculatorValidate')

router
  .get('/', controllerProducts.getProducts)
  .get('/calculator', validateCalc, calculator.getDailyCalories)
  .get('/foods', controllerProducts.getProductsByQuery)

module.exports = router
