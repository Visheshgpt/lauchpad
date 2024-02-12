const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const db = require("../connections/dbMaster");

const TokenMetricSchema = new mongoose.Schema(
	{
		allocation: {
			type: String,
		},
		allocationPercentage: {
			type: Number,
			default: 0,
		}, 
        amount: {
			type: Number,
			default: 0,
		},
        price: {
			type: Number,
			default: 0,
		},
        raise: {
			type: Number,
			default: 0,
		},
        TGE: {
			type: Number,
			default: 0,
		},
        vesting: {
			type: String,
		},
        initialSupply: {
			type: Number,
			default: 0,
		},
        initialMarketCap: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const TokenMetric = db.model('TokenMetric', TokenMetricSchema)

module.exports = {
	TokenMetric,
	TokenMetricSchema
};