const express = require("express");
const router = express.Router();
const { userRoutes } = require("./user");
const { saleRoutes } = require("./sale");
const { tokenRoutes } = require("./token");

router.use("/user", userRoutes);
router.use("/sale", saleRoutes);
router.use("/token", tokenRoutes);

module.exports = router;
