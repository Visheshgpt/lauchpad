const express = require("express");
const {
  getAllProjects,
  getProjectByName,
  updateProjectDetails,
} = require("../controllers/projects");
const { isLoggedIn, isAdmin } = require("../middlewares");

const projectRoutes = express.Router();

projectRoutes.get("/getAllProjects", getAllProjects);
projectRoutes.get("/getProjectByName/:projectName", getProjectByName);

projectRoutes.put(
  "/updateProjectDetails/:projectName",
  isLoggedIn,
  isAdmin,
  updateProjectDetails
);

module.exports = { projectRoutes };
