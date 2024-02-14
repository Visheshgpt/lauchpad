const express = require("express");
const {
  getallIdo,
  getIdo,
  getIdoByProject,
  updateIdoDetails,
} = require("../controllers/ido");
const { isLoggedIn, isAdmin } = require("../middlewares");

const idoRoutes = express.Router();

idoRoutes.get("/getallIdo", getallIdo);
idoRoutes.get("/getIdo/:idoId", getIdo);
idoRoutes.get("/getIdoByProject/:projectName", getIdoByProject);

idoRoutes.put(
  "/updateIdoDetails/:idoId",
  isLoggedIn,
  isAdmin,
  updateIdoDetails
);

module.exports = { idoRoutes };
