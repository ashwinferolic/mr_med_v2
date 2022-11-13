const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsersList,
  deleteUsersList,
  loginUser,
  logoutUser,
  getUserById,
  editUserById,
  deleteUserById,
} = require("./user.controller");
const { protected } = require("../../utils/token");
const { validate } = require("../../middleware/joi.middleware");
const {
  userSchema,
  loginUserSchena,
  registerUserSchema,
} = require("./user.validation");

// register and login
router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchena), loginUser);
router.post("/logout", protected, logoutUser);

// users list
router.get("/list", getUsersList);
router.delete("/list", deleteUsersList);

// update user by id
router.get("/:id", getUserById);
router.put("/:id", validate(userSchema), editUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
