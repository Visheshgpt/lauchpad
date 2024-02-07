const express = require("express");
const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
  res.send("All Ok!");
});


module.exports = {userRoutes};