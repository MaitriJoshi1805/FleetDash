const express = require("express");

const router = express.Router();

const {
  getAllGeofences,
  getGeofenceById,
  createGeofence,
  updateGeofence,
  deleteGeofence,
} = require("../controllers/geofenceController");

// Get all geofences
router.get("/", getAllGeofences);

// Get one geofence
router.get("/:id", getGeofenceById);

// Create geofence
router.post("/", createGeofence);

// Update geofence
router.put("/:id", updateGeofence);

// Delete geofence
router.delete("/:id", deleteGeofence);

module.exports = router;