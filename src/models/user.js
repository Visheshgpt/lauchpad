const mongoose = require("mongoose");
const db = require("../connections/dbMaster");
var jwt = require("jsonwebtoken");
const config = require("../config/config");
const { ObjectId } = mongoose.Schema;

const userSales = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  }, 
  ido: {
    type: ObjectId,
    ref: "Ido",
  },
  invested: {
    type: Boolean,
    default: false,
  },
  investmentDate: {
    type: Date,
  },
  isWinner: {
    type: Boolean,
    default: false,
  },
  participationDate: {
    type: Date,
  },
  ticketCount: {
    type: Number,
    default: 0,
  },
});

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
    sales: [userSales],
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

const User = db.model("User", userSchema);

module.exports = {
  User,
  userSales
} ;
