const mongoose = require("mongoose");
const db = require("../connections/dbMaster");
const { ObjectId } = mongoose.Schema;

const AccountSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      unique: true,
    },
    holdingsHistory: [
      {
        amount: Number,
        timestamp: Date,
      },
    ],
    isKycVerified: {
      type: Boolean,
      default: false,
    },
    lastBalanceCheckedTime: {
      type: Date,
    },
    lastActive: {
      type: Date,
    },
    creationDate: {
      type: Date,
      default: new Date()
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
