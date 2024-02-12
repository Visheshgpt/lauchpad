const express = require("express");
const {
  getallIdo,
  getIdo,
  getIdoByProject,
  updateIdoDetails,
} = require("../controllers/ido");

const idoRoutes = express.Router();

idoRoutes.get("/getallIdo", getallIdo);
idoRoutes.get("/getIdo/:idoId", getIdo);
idoRoutes.get("/getIdoByProject/:projectName", getIdoByProject);

idoRoutes.put("/updateIdoDetails/:idoId", updateIdoDetails);

module.exports = { idoRoutes };
