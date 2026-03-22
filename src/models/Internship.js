const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    domain: { type: String, required: true },

    duration: {
      type: String,
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    filledSeats: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
