const mongoose = require("mongoose");
const db = require("../connections/dbMaster");
const { ObjectId } = mongoose.Schema;

const AccountSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      unique: true,
    },
    holdingsHistory: {
      type: Array,
      default: [],
    },
    holdingsTimeline: {
      type: Array,
      default: [],
    },
    isKycVerified: {
      type: Boolean,
      default: false,
    },
    lastBalanceCheckedTime: {
      type: Number,
      default: 0,
    },
    lastActive: {
      type: Number,
      default: 0,
    },
    eligibleForGiftCard: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Account = db.model("Account", AccountSchema);

module.exports = Account;
