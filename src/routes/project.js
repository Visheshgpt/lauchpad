const express = require("express");
const {
  getAllProjects,
  getProjectByName,
  updateProjectDetails,
} = require("../controllers/projects");

const projectRoutes = express.Router();

projectRoutes.get("/getAllProjects", getAllProjects);
projectRoutes.get("/getProjectByName/:projectName", getProjectByName);

projectRoutes.put("/updateProjectDetails/:projectName", updateProjectDetails);

module.exports = { projectRoutes };
