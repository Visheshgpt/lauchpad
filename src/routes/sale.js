const express = require("express");
const { createSale } = require("../controllers/sale");
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

module.exports = { saleRoutes };
