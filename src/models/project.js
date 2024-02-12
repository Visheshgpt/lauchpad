const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const db = require("../connections/dbMaster");


const projectSchema = new mongoose.Schema(
  {
    token: {
      type: ObjectId,
      ref: "Token",
      required: true
    },
    projectTitle: {
      type: String,
      unique: true
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
      default: 1,
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
      type: Number,
      default: parseInt(Date.now() / 1000),
    },
    team: {
      leadVc: {
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
        type: Array,
        default: []
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
