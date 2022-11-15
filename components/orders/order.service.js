const moment = require("moment");
const { findOneAndDelete } = require("./order.model");
const Order = require("./order.model");

// add order service
const addOrderService = async (req, res, next) => {
  try {
    let data = await Order.create({
      user: req.user.id,
      cartItems: req.body.cartItems,
      orderedDate: moment(), // order timing will be in utc, because of mongoose atlas server
      orderType: req.body.orderType,
      duration: req.body.duration,
      status: req.body.status,
      prescription: req.body.prescription,
      payment: req.body.payment,
    });
    return data;
  } catch (error) {
    next(error);
  }
};

// get orderlist service
const getOrderListService = async (req, res, next) => {
  try {
    let user_id = req.user.id;
    let data = await Order.find({ user: user_id });
    return data;
  } catch (error) {
    next(error);
  }
};

// get order by id service
const getOrderByIdService = async (req, res, next) => {
  try {
    let data = await Order.findOneAndUpdate({
      $and: [{ _id: req.params.id }, { user: req.user.id }],
    })
      .populate("cartItems.product", "productName priceToCustomer")
      .populate("user", "userName email address");
    return data;
  } catch (error) {
    next(error);
  }
};

const cancelOrderByIdService = async (req, res, next) => {
  try {
    return await Order.findOneAndDelete({
      $and: [{ _id: req.params.id }, { user: req.user.id }],
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderByIdService = async (req, res, next) => {
  try {
    let data = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
          newUser: req.body.newUser,
          prescription: req.body.prescription,
        },
      },
      { new: true }
    );
    return data;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrderService,
  getOrderListService,
  getOrderByIdService,
  cancelOrderByIdService,
  updateOrderByIdService,
};
