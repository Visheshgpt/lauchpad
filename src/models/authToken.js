const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const AuthTokenSchema = new mongoose.Schema(
  {
    expires: {
      type: Number,
    },
    expiresPrettyPrint: {
      type: Number,
    },
    token: {
      type: String,
    },
    walletAddress: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const AuthToken = db.model("AuthToken", AuthTokenSchema);

module.exports = AuthToken;
