const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const db = require("../connections/dbMaster");


const IdoSchema = new mongoose.Schema(
  {
    project: {
      type: ObjectId,
      ref: "Project",
      required: true
    },
    completed: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Number,
      default: 0,
    },
    endDate: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Participation",
      enum: ["Participation", "Snapshot", "Investment", "Redeem"],
    },
    totalWinners: {
      type: Number,
      default: 0,
    },
    totalInvestors: {
      type: Number,
      default: 0,
    },
    amountToRaise: {
      type: Number,
      default: 0,
    },
    presaleTokenPrice: {
      type: Number,
      default: 0,
    },
    vestingAmounts: {
      type: Array,
      default: [],
    },
    totalIssued: {
      type: Number,
      default: 0,
    },
    totalAssetsConnected: {
      type: Number,
      default: 0,
    },
    saleType: {
      type: String,
      default: "Nexus Launch",
      enum: ["Nexus Launch", "Featured Launch"],
    },
    roi: {
      type: String,
      default: "",
    },
    users: {
      type: [ObjectId],
      ref: 'User'
    } 

  },
  { timestamps: true }
);

const Ido = db.model("Ido", IdoSchema);

module.exports = Ido;
