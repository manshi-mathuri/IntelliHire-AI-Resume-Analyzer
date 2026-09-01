const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    atsScore: {
      type: Number,
      required: true
    },

    matchedSkills: {
      type: [String],
      default: []
    },

    missingSkills: {
      type: [String],
      default: []
    },

    suggestions: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);
const AnalysisModel = mongoose.model("Analysis", analysisSchema);

module.exports = AnalysisModel;