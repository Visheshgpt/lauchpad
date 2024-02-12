const express = require("express");
const router = express.Router();
const { userRoutes } = require("./user");
const { saleRoutes } = require("./sale");
const { tokenRoutes } = require("./token");
const { projectRoutes } = require("./project");
const { idoRoutes } = require("./ido");


router.use("/user", userRoutes);
router.use("/sale", saleRoutes);
router.use("/token", tokenRoutes);
router.use("/project", projectRoutes);
router.use("/ido", idoRoutes);

module.exports = router;
