const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const projectSchema = new mongoose.Schema(
  {
    token: {
      type: ObjectId,
      ref: "Token",
    },
    name: {
      type: String,
    },
    telegramId: {
      type: String,
    },
    website: {
      type: String,
    },
    introduction: {
      type: String,
    },
    chainId: {
      type: Number,
    },
    overview: {
      type: Array,
      default: [],
    },
    marketFocusAndCompetition: {
      type: Array,
      default: [],
    },
    revenueStreams: {
      type: Array,
      default: [],
    },
    whitepaper: {
      type: String,
    },
    socialCommunityLinks: {
      type: Array,
      default: [],
    },
    creationDate: {
      type: String,
    },
    team: {
      leadVC: {
        type: String,
      },
      marketMaker: {
        type: String,
      },
    },
    keyFeatures: {
      type: Array,
      default: [],
    },
    logoUrl: {
      type: String,
    },
    launched: {
      type: Boolean,
      default: false,
    },
    bannerImageUrl: {
      type: String,
    },
    projectTags: {
        type: String,
    },
    routeName: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    timeline: [
      {
        heading: {
          type: String,
        },
        subHeading: {
          type: String,
        },
        text: {
          type: Array,
          default: [],
        },
      },
    ],
  },
  { timestamps: true }
);

const Project = db.model("Project", projectSchema);

module.exports = Project;
