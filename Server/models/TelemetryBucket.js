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
        timestamp: {
          type: Date,
          default: Date.now,
        },

        speed: {
          type: Number,
          default: 0,
        },

        fuel: {
          type: Number,
          default: 100,
        },

        temperature: {
          type: Number,
          default: 80,
        },

        latitude: {
          type: Number,
          default: 0,
        },

        longitude: {
          type: Number,
          default: 0,
        },

        engine: {
          type: String,
          default: "ON",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

telemetryBucketSchema.index({
  vehicleId: 1,
  startTime: -1,
});

module.exports = mongoose.model(
  "TelemetryBucket",
  telemetryBucketSchema
);