const express = require("express");
const router = express.Router();
const { protected } = require("../../utils/token");
const { validate } = require("../../middleware/joi.middleware");
const { addorderSchema, updateOrderSchema } = require("./order.validation");
const {
  addOrder,
  getOrderList,
  getOrderById,
  cancelOrderById,
  updateOrderById,
} = require("./order.controller");

router.post("/add", protected, validate(addorderSchema), addOrder);
router.get("/list", protected, getOrderList);

router.get("/:id", protected, getOrderById);
router.delete("/:id", protected, cancelOrderById);

// only admin can update orders
router.put("/:id", protected, validate(updateOrderSchema), updateOrderById);

module.exports = router;
