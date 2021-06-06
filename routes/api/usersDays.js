const express = require("express");
const router = express.Router();

const controllerUserDay = require("../../src/controllers/controllerUserDay");
const guard = require("../../src/helpers/guard");

router
  .post("/:productId", guard, controllerUserDay.eatenProductPerDay)
  .delete("/:productId", guard, controllerUserDay.removeProduct)
  .post("/", guard, controllerUserDay.getUserDayInfo);

module.exports = router;
