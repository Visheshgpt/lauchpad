const Token = require("../models/token");
const Project = require("../models/project");
const Ido = require("../models/ido");
const { handleError } = require("../helpers/responseHandler");
const db = require("../connections/dbMaster");
const logger = require("../helpers/logger");

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

    res.status(200).send({
      msg: "sale created successfully",
      token,
      project,
      ido,
    });
  } catch (error) {
    logger.debug(error.message);
    handleError({ res, err_msg: "Error in sale creation", error });
  }
};

module.exports = {
  createSale,
};
