const express = require("express");
const {
  getAllTokens,
  getToken,
  updateTokenDetails,
} = require("../controllers/tokens");
const { isLoggedIn, isAdmin } = require("../middlewares");

const tokenRoutes = express.Router();

tokenRoutes.get("/getAllTokens", getAllTokens);
tokenRoutes.get("/getToken/:tokenId", getToken);

tokenRoutes.put(
  "/updateTokenDetails/:tokenId",
  isLoggedIn,
  isAdmin,
  updateTokenDetails
);

module.exports = { tokenRoutes };
