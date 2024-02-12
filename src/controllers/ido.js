const Ido = require("../models/ido");
const { handleError, handleResponse } = require("../helpers/responseHandler");

const getallIdo = async (req, res) => {
  try {
    const data = await Ido.find();
    handleResponse({ res, data });
  } catch (error) {
    handleError({
      res,
      error,
    });
  }
};

const getIdo = async (req, res) => {
  try {
    const _id = req.params.idoId;
    const data = await Ido.findById({ _id }).populate("project").exec();
    if (!data) {
      handleError({
        res,
        statusCode: 404,
        err_msg: "No Token found",
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

const getIdoByProject = async (req, res) => {
  try {
    const projectTitle = req.params.projectName;
    const data = await Ido.findOne()
      .populate({ path: "project", match: { projectTitle } })
      .exec();

    if (!data || !data.project) {
      handleError({
        res,
        statusCode: 404,
        err_msg: "No Ido found with this project title",
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

const updateIdoDetails = async (req, res) => {
  try {
    const _id = req.params.idoId;
    const data = await Ido.findOneAndUpdate(
      { _id },
      { $set: req.body },
      { new: true }
    );
    if (!data) {
      handleError({
        res,
        statusCode: 404,
        err_msg: "No Ido found",
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
  getallIdo,
  getIdo,
  getIdoByProject,
  updateIdoDetails,
};
