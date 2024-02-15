const Token = require("../models/token");
const Project = require("../models/project");
const Ido = require("../models/ido");
const { handleError, handleResponse } = require("../helpers/responseHandler");
const db = require("../connections/dbMaster");
const logger = require("../helpers/logger");
const { User } = require("../models/user");

const createSale = async (req, res) => {
  try {
    const { tokenDetails, projectDetails, idoDetails } = req.body;

    const { metrics } = tokenDetails || {};
    tokenDetails.metrics = metrics;
    const token = new Token(tokenDetails);

    projectDetails.token = token._id;
    const project = new Project(projectDetails);

    idoDetails.project = project._id;
    const ido = new Ido(idoDetails);

    const session = await db.startSession();
    session.startTransaction();

    try {
      await Promise.all([
        token.save({ session }),
        project.save({ session }),
        ido.save({ session }),
      ]);

      await session.commitTransaction();
    } catch (error) {
      if (session) {
        try {
          logger.info("aborting session");
          await session.abortTransaction();
          session.endSession();
        } catch (abortError) {
          logger.debug(`Error in aborting transaction: ${abortError}`);
          session.endSession();
        }
      }
      handleError({ res, err_msg: "Error in commiting transaction:", error });
      return;
    } finally {
      if (session) {
        session.endSession();
      }
    }

    handleResponse({
      res,
      msg: "sale created successfully",
      data: { token, project, ido },
    });
  } catch (error) {
    logger.debug(error.message);
    handleError({ res, err_msg: "Error in sale creation", error });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const idoId = req.params.idoId;
    if (!status) {
      handleError({ res, error: "no status pass" });
      return;
    }

    if (
      !["Participation", "Snapshot", "Investment", "Redeem"].includes(status)
    ) {
      handleError({ res, error: "Invalid status" });
      return;
    }

    const statusUpdate = { $set: { status: status } };

    const updatedProject = await Ido.findOneAndUpdate(
      { _id: idoId },
      statusUpdate,
      { new: true }
    );

    if (!updatedProject) {
      handleError({
        res,
        err_msg: "Error in change sale status",
        error: "Ido not Found",
      });
      return;
    }

    handleResponse({ res, data: updatedProject });
  } catch (error) {
    logger.debug(error.message);
    handleError({ res, err_msg: "Error in change sale status", error });
  }
};

const whiteListUsers = async (req, res) => {
  try {
    const idoId = req.params.idoId;
    const { addresses } = req.body;

    const result = await User.updateMany(
      { "account.address": { $in: addresses }, "sales.ido": idoId },
      { $set: { "sales.$[elem].isWinner": true } },
      { arrayFilters: [{ "elem.ido": idoId }] }
    );

    handleResponse({ res, data: result });
  } catch (error) {
    logger.debug(error.message);
    handleError({ res, err_msg: "Error in change sale status", error });
  }
};

module.exports = {
  createSale,
  changeStatus,
  whiteListUsers,
};
