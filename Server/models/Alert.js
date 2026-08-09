const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
      index: true,
    },
    driver: {
      type: String,
      default: "Unknown Driver",
    },
    alertType: {
      type: String,
      required: true,
      enum: ["Overspeed", "Low Fuel", "High Temperature", "Geofence Exit", "Geofence Entry", "General Warning"],
    },
    message: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["Critical", "Warning", "Info"],
      default: "Warning",
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    status: {
      type: String,
      enum: ["Active", "Resolved"],
      default: "Active",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

alertSchema.index({ status: 1 });
alertSchema.index({ timestamp: -1 });

module.exports = mongoose.model("Alert", alertSchema);
