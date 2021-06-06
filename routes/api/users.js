const express = require("express");
const router = express.Router();

const controllerUser = require("../../src/controllers/controllerUser");
const guard = require("../../src/helpers/guard");

router.post("/signup", controllerUser.signup);

router.post("/login", controllerUser.login);

router.post("/logout", guard, controllerUser.logout);
router.post("/private", guard, controllerUser.updCalNotRecFoods);

module.exports = router;
