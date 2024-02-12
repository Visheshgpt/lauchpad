const express = require("express");
const { getAllTokens } = require("../controllers/tokens");

const tokenRoutes = express.Router();

tokenRoutes.get("/getAllTokens", getAllTokens);

module.exports = { tokenRoutes };
