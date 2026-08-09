const mongoose = require("mongoose");

const geofenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["Circle","Polygon"],
      required: true
    },
    center: {
      latitude: Number,
      longitude: Number
    },
    radius: {
      type: Number,
      default: 0
    },
    polygon: [{
      latitude: Number,
      longitude: Number
    }]
  },
  {
    timestamps: true
  }
);

mongoose.exports = mongoose.model("Geofence",geofenceSchema);