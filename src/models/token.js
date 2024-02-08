const mongoose = require("mongoose");
const { TokenMetricSchema } = require("./tokenMetric");
const { ObjectId } = mongoose.Schema;

const TokenSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    totalSupply: {
      type: Number,
      default: 0,
    },
    fullyDilutedMarketCap: {
      type: Number,
      default: 0,
    },
    hardcap: {
      type: Number,
      default: 0,
    },
    initialMarketCap: {
      type: Number,
      default: 0,
    },
    valuation: {
      type: Number,
      default: 0,
    },
    platformRaise: {
      type: Number,
      default: 0,
    },
    network: {
      type: String,
    },
    utility: {
      type: Array,
      default: [],
    },
    metrics: {
      type: [TokenMetricSchema],
    },
  },
  { timestamps: true }
);

const Token = db.model("Token", TokenSchema);

module.exports = Token;
