const express = require("express");
const {
  getAllTokens,
  getToken,
  updateTokenDetails,
} = require("../controllers/tokens");

const tokenRoutes = express.Router();

tokenRoutes.get("/getAllTokens", getAllTokens);
tokenRoutes.get("/getToken/:tokenId", getToken);

tokenRoutes.put("/updateTokenDetails/:tokenId", updateTokenDetails);

module.exports = { tokenRoutes };
