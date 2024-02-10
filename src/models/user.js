const mongoose = require("mongoose");
const db = require("../connections/dbMaster");
var jwt = require("jsonwebtoken");
const config = require("../config/config");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
    },
    email: {
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        "https://launch.apeterminal.io/static/media/Skull.faaf7226740c1a27e54c03535fefa0cf.svg",
    },
    account: {
      type: ObjectId,
      ref: "Account",
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.expirationTime,
  });
};

// userSchema.methods.getJwtToken = () => {
//   return jwt.sign({ id: "hello" }, "secret", {
//     expiresIn: 24 * 60 * 60 * 1000
//   } )
// }

const User = db.model("User", userSchema);

module.exports = User;
