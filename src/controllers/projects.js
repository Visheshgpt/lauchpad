const Project = require("../models/project");
const { handleError, handleResponse } = require("../helpers/responseHandler");

const getAllProjects = async (req, res) => {
  try {
    const data = await Project.find().populate("token");
    handleResponse({ res, data });
  } catch (error) {
    handleError({
      res,
      error,
    });
  }
};

const getProjectByName = async (req, res) => {
  try {
    const projectTitle = req.params.projectName;
    const data = await Project.findOne({ projectTitle }).populate("token");
    if (!data) {
      handleError({
        res,
        statusCode: 404,
        err_msg: "No project found",
      });
      return;
    }
    handleResponse({ res, data });
  } catch (error) {
    handleError({
      res,
      error,
    });
  }
};

const updateProjectDetails = async (req, res) => {
  try {
    const projectTitle = req.params.projectName;
    const data = await Project.findOneAndUpdate(
      { projectTitle },
      { $set: req.body },
      { new: true }
    );

    if (!data) {
      handleError({
        res,
        statusCode: 404,
        err_msg: "No project found",
      });
      return;
    }
    handleResponse({ res, data });
  } catch (error) {
    handleError({
      res,
      error,
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectByName,
  updateProjectDetails,
};
