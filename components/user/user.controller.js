const { existsUserService, registerUserService } = require("./user.service");

const registerUser = async (req, res, next) => {
  try {
    let user = await existsUserService(req, res, next);
    if (user) {
      let error = new Error("User already exists");
      error.status = 400;
      throw error;
    } else {
      let data = await registerUserService(req, res, next);
      if (data) {
        return res
          .status(201)
          .json({ message: "account registered successfully", data });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser };
