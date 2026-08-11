const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    tripId: {
      type: String,
      required: [true, "Trip ID is required"],
      unique: true,
      trim: true,
    },
    vehicle: {
      type: String,
      required: [true, "Vehicle is required"],
    },
    driver: {
      type: String,
      required: [true, "Driver is required"],
    },
    source: {
      type: String,
      required: [true, "Source is required"],
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
    },
    startTime: {
      type: String,
      default: "09:00 AM",
    },
    endTime: {
      type: String,
      default: "05:00 PM",
    },
    status: {
      type: String,
      enum: ["Pending", "Running", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

tripSchema.index({ tripId: 1 });
tripSchema.index({ status: 1 });

module.exports = mongoose.model("Trip", tripSchema);
