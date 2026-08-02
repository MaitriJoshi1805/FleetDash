const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String
    },
    experiance: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["Active","Inactive"],
      default: "Active"
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Driver",driverSchema);