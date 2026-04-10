const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    name_eng: {
      type: String,
      required: true,
    },
    name_it: {
      type: String,
      required: true,
    },
    name_ar: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    description_eng: {
      type: String,
      required: true,
    },
    description_it: {
      type: String,
      required: true,
    },
    description_ar: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: [String], // better than generic Array
      required: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;