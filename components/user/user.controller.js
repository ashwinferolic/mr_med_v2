const { comparePassword } = require("../../utils/password");
const { generateToken } = require("../../utils/token");
const createError = require("http-errors");
const {
  existsUserService,
  registerUserService,
  getUsersListService,
  deleteUsersListService,
  findUserByEmailService,
  findUserByIdService,
  editUserService,
  deleteUserByIdService,
} = require("./user.service");

// register user
const registerUser = async (req, res, next) => {
  try {
    let user = await existsUserService(req, res, next);
    if (user) {
      next(createError(400, "User already exists"));
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

// get users list
const getUsersList = async (req, res, next) => {
  try {
    let data = await getUsersListService(req, res, next);
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

// delete users list
const deleteUsersList = async (req, res, next) => {
  try {
    let data = await deleteUsersListService(req, res, next);
    if (data) {
      res.status(200).json({ message: "user list have been deleted", data });
    }
  } catch (error) {
    next(error);
  }
};

// login user
const loginUser = async (req, res, next) => {
  try {
    let user = await findUserByEmailService(req, res, next);
    if (user && (await comparePassword(req.body.password, user.password))) {
      let token = generateToken(user.userName, user.email);
      let data = {
        user,
        token,
      };
      return res.status(200).json({ message: "Login success", data });
    } else {
      next(createError(400, "Invalid username or password"));
    }
  } catch (error) {
    next(error);
  }
};

// logout user
const logoutUser = async (req, res, next) => {
  try {
    let token = req.user;
    if (token) {
      req.user = null;
      res.status(200).json({ message: "user have been logged out" });
    } else {
      next(createError(400, "user not logged in"));
    }
  } catch (error) {
    next(error);
  }
};

// get user by id
const getUserById = async (req, res, next) => {
  try {
    let user = await findUserByIdService(req, res, next);
    if (user) {
      return res.status(200).json(user);
    } else {
      next(createError(404, "user not found /api/users/id"));
    }
  } catch (error) {
    next(error);
  }
};

// edit user by id
const editUserById = async (req, res, next) => {
  try {
    let user = await editUserService(req, res, next);
    if (user) {
      res.status(200).json({ message: "User have been updated", user });
    } else {
      next(createError(404, "user not found /api/users/id"));
    }
  } catch (error) {
    next(error);
  }
};

// delete user by id
const deleteUserById = async (req, res, next) => {
  try {
    const user = await deleteUserByIdService(req, res, next);
    if (user) {
      return res
        .status(200)
        .json({ message: "User have been deleted!", user: user.userName });
    } else {
      next(createError(404, "user not found /api/users/id"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  getUsersList,
  deleteUsersList,
  loginUser,
  logoutUser,
  getUserById,
  editUserById,
  deleteUserById,
};
