const mongoose = require("mongoose");

const geofenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Geofence name is required"],
      trim: true,
    },
    shapeType: {
      type: String,
      enum: ["Circle", "Polygon"],
      default: "Circle",
    },
    center: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    radius: {
      type: Number, // Radius in meters for Circle shape
      default: 5000,
    },
    coordinates: [
      {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
    ],
    color: {
      type: String,
      default: "#3b82f6",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

geofenceSchema.index({ name: 1 });

module.exports = mongoose.model("Geofence", geofenceSchema);
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
