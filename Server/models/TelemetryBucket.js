const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    speed: {
      type: Number,
      required: true
    },
    fuelLevel: {
      type: Number,
      required: true
    },
    engineStatus: {
      type: String,
      enum: ["ON","OFF"],
      default: "ON"
    },
    temprature: {
      type: Number,
      required: true
    },
    recordedAt: {
      type: Date,
      default: Date.now
    }
  },{_id: false}
);

const telemetryBucketSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true
    },
    bucketDate: {
      type: String,
      required: true
    },
    hour: {
      type: Number,
      required: true
    },
    recods: [recordSchema]
  }, {timestamps: true}
);

module.exports = mongoose.model("TelemetryBucket",telemetryBucketSchema);