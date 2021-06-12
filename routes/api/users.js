const express = require("express");
const router = express.Router();

const controllerUser = require("../../src/controllers/controllerUser");
const guard = require("../../src/helpers/guard");
const { validateCalc } = require("../../src/validation/calculatorValidate");

router.post("/signup", controllerUser.signup);

router.post("/login", controllerUser.login);

router.post("/logout", guard, controllerUser.logout);
router.post("/private", validateCalc, guard, controllerUser.updCalNotRecFoods);

module.exports = router;
