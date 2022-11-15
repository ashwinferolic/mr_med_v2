const {
  addOrderService,
  getOrderListService,
  getOrderByIdService,
  cancelOrderByIdService,
  updateOrderByIdService,
} = require("./order.service");
const createError = require("http-errors");

const addOrder = async (req, res, next) => {
  try {
    let order = await addOrderService(req, res, next);
    if (order) {
      return res
        .status(201)
        .json({ message: "Order have been created!", order });
    }
  } catch (error) {
    next(error);
  }
};

const getOrderList = async (req, res, next) => {
  try {
    let orders = await getOrderListService(req, res, next);
    if (orders) {
      res.status(200).json(orders);
    }
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    let order = await getOrderByIdService(req, res, next);
    if (order) {
      res.status(200).json(order);
    } else {
      next(createError(404, "order not found for the logged in user"));
    }
  } catch (error) {
    next(error);
  }
};

const cancelOrderById = async (req, res, next) => {
  try {
    let order = await cancelOrderByIdService(req, res, next);
    if (order) {
      res
        .status(200)
        .json({ message: "Order have been deleted", order: order._id });
    } else {
      next(createError(404, "order not found for the logged in user"));
    }
  } catch (error) {
    next(error);
  }
};

const updateOrderById = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      let order = await updateOrderByIdService(req, res, next);
      if (order) {
        res.status(202).json({ message: "order have been updated", order });
      } else {
        next(createError(404, "Order not found"));
      }
    } else {
      next(createError(401, "only admin can update orders"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrder,
  getOrderList,
  getOrderById,
  cancelOrderById,
  updateOrderById,
};
