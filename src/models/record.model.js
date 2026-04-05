const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"], 
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
      index: true, 
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true, 
    },

    note: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
      index: true, 
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, 
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);