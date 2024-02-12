var jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user");

module.exports.saleInputValidation = async (req, res, next) => {
  try {
    const { tokenDetails, projectDetails, idoDetails } = req.body;

    const validations = [
      {
        object: tokenDetails,
        fields: ["name", "symbol", "totalSupply", "hardCap", "platformRaise"],
        objectName: "Token details",
      },
      {
        object: projectDetails,
        fields: ["projectTitle", "telegramId", "website"],
        objectName: "Project details",
      },
      {
        object: idoDetails,
        fields: [
          "startDate",
          "endDate",
          "totalWinners",
          "amountToRaise",
          "totalInvestors",
          "presaleTokenPrice",
          "totalIssued",
        ],
        objectName: "IDO details",
      },
    ];

    for (const validation of validations) {
      const { object, fields, objectName } = validation;
      if (!object) {
        return res.status(500).send({ msg: `${objectName} missing` });
      }
      for (const field of fields) {
        if (!object[field]) {
          return res
            .status(500)
            .send({ msg: `${objectName}: ${field} missing` });
        }
      }
    }

    next();
  } catch (error) {
    return res.status(500).send({ msg: error?.message });
  }
};
