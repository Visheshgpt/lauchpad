const express = require("express");
const { createSale, changeStatus, whiteListUsers } = require("../controllers/sale");
const { saleInputValidation } = require("../middlewares/saleValidation");
const { isLoggedIn, isAdmin } = require("../middlewares");

const saleRoutes = express.Router();

saleRoutes.post(
  "/createSale",
  isLoggedIn,
  isAdmin,
  saleInputValidation,
  createSale
);

saleRoutes.put(
  "/changesalestatus/:idoId",
  isLoggedIn,
  isAdmin,
  changeStatus
);

saleRoutes.put(
  "/whitelistusers/:idoId",
  isLoggedIn,
  isAdmin,
  whiteListUsers
);

module.exports = { saleRoutes };
