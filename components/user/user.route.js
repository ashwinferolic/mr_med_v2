const express = require("express");
const router = express.Router();
const { registerUser } = require("./user.controller");
const { validate } = require("../../middleware/joi.middleware");
const { userSchema } = require("./user.validation");

router.post("/register", validate(userSchema), registerUser);

module.exports = router;
