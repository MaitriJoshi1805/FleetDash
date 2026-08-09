const mongoose = require("mongoose");

const telemetryBucketSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
      index: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    measurementCount: {
      type: Number,
      default: 0,
    },
    measurements: [
      {
        timestamp: { type: Date, default: Date.now },
        speed: Number,
        fuel: Number,
        temperature: Number,
        latitude: Number,
        longitude: Number,
        engine: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

telemetryBucketSchema.index({ vehicleId: 1, startTime: -1 });

module.exports = mongoose.model("TelemetryBucket", telemetryBucketSchema);
