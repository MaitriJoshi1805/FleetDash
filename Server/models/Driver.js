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

// Indexes
driverSchema.index({ name: 1 });
driverSchema.index({ status: 1 });

// Export Driver model
module.exports = mongoose.model("Driver", driverSchema);