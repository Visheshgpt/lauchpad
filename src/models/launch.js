const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const launchSchema = new mongoose.Schema(
  {
    bannerImageUrl: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    projectTitle: {
        type: String,
    },
    projectTags: {
        type: String,
    },
  
  },
  { timestamps: true }
);

const Launch = db.model("Launch", launchSchema);

module.exports = Launch;
