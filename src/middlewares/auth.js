var jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user");
const { handleError } = require("../helpers/responseHandler");

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      (
        req.header("Authorization") &&
        req.header("Authorization").replace("Bearer", "")
      ).replace(" ", "");

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = await User.findById(decoded.id).populate('account').exec();
    next();
  } catch (error) {
    handleError({ res, err_msg: "Unauthorized", error });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role === 0) {
      const error = new Error("not a admin")
      handleError({ res, err_msg: "Unauthorized", error });
      return
    }
    next();
  } catch (error) {
    handleError({ res, err_msg: "Unauthorized", error });
  }
};
