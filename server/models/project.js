const mongoose = require("mongoose")
const { Schema } = mongoose

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please enter project title"],
      lowercase: true,
      trim: true,
    },

    abstract: {
      type: String,
      required: [true, "please enter abstract"],
      lowercase: true,
      trim: true,
    },
    authors: {
      type: [String],
      required: [true, "please enter authors names"],
      lowercase: true,
      trim: true,
    },

    authorImage: {
      type: String,
      default:
        "https://spng.pngfind.com/pngs/s/500-5008297_lars-christian-larsen-user-profile-image-png-transparent.png",
    },

    tags: [String],

    createdBy: {
      type: mongoose.ObjectId,
      required: [true, "please enter creator's name"],
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
)

const Project = mongoose.model("projects", ProjectSchema)

module.exports = Project
