var jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user");

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      (
        req.header("Authorization") &&
        req.header("Authorization").replace("Bearer", "")
      ).replace(" ", "");

    if (!token) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).send({
      message: "Unauthorized",
      error,
    });
  }
};
