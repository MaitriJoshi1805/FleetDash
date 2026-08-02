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