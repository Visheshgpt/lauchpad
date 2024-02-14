const express = require("express");
const { isLoggedIn, verifySignature, fetchPrice } = require("../middlewares");

const {
  ethereumlogin,
  getUser,
  iskycVerified,
  holdings,
  updateHoldings,
  getallSales,
  registerIdo
} = require("../controllers/user");
const userRoutes = express.Router();

userRoutes.post("/ethereumlogin", verifySignature, ethereumlogin);
userRoutes.get("/", isLoggedIn, getUser);
userRoutes.get("/isKycVerified/:walletAddress", iskycVerified);
userRoutes.get("/holdings", isLoggedIn, holdings);
userRoutes.get("/updateHoldings", isLoggedIn, updateHoldings);

userRoutes.post('/register/:idoId', isLoggedIn, registerIdo)
userRoutes.get('/allSales', isLoggedIn, getallSales)


module.exports = { userRoutes };
