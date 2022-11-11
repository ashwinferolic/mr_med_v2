const User = require("./user.model");
const { hashPassword } = require("../../utils/password");

// check if user exists
const existsUserService = async (req, res, next) => {
  try {
    let data = await User.findOne({ email: req.body.email });
    return data;
  } catch (error) {
    next(error);
  }
};

// register user
const registerUserService = async (req, res, next) => {
  try {
    let hashedPassword = await hashPassword(req.body.password);
    let data = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      password: hashedPassword,
      address: req.body.address,
    });
    return data;
  } catch (error) {
    next(error);
  }
};

module.exports = { existsUserService, registerUserService };
