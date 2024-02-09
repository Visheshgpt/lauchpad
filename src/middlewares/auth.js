var jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.isLoggedIn = async (req, res, next) => {
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

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).send({
      message: "Unauthorized",
      error,
    });
  }
};
