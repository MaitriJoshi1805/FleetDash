const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNo: {
      type: String,
      required: [true, "Vehicle Number is required"],
      unique: true,
      trim: true,
    },
    driver: {
      type: String,
      default: "Unassigned",
      trim: true,
    },
    phone: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "Truck",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Online", "Offline", "Moving", "Stopped"],
      default: "Online",
    },
    location: {
      type: String,
      default: "Unknown",
    },
    latitude: {
      type: Number,
      default: 19.076,
    },
    longitude: {
      type: Number,
      default: 72.8777,
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
    engine: {
      type: String,
      enum: ["ON", "OFF"],
      default: "ON",
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

vehicleSchema.index({ vehicleNo: 1 });
vehicleSchema.index({ status: 1 });

module.exports = mongoose.model("Vehicle", vehicleSchema);
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true
    },
    vehicleType: {
      type: String,
      required: true
    },
    fuelCapacity: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["Running","Stopped","Maintenance"],
      default: "Running"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Vehicle",vehicleSchema);
