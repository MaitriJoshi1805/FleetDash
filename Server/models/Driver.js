const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    license: {
      type: String,
      required: [true, "License number is required"],
      trim: true,
    },
    experience: {
      type: String,
      default: "1 Year",
    },
    vehicle: {
      type: String,
      default: "Unassigned",
    },
    status: {
      type: String,
      enum: ["Active", "On Leave", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

driverSchema.index({ name: 1 });
driverSchema.index({ status: 1 });

module.exports = mongoose.model("Driver", driverSchema);
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
