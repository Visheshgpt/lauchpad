const Token = require("../models/token");
const { handleError, handleResponse } = require("../helpers/responseHandler");

const getAllTokens = async (req, res, next) => {
  try {
    const data = await Token.find();
    handleResponse({ res, data });
  } catch (error) {
    handleError({
      res,
      error,
    });
  }
};

module.exports = {
  getAllTokens,
};
