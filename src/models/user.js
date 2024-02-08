const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
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

const User = db.model("User", userSchema);

module.exports = User;
