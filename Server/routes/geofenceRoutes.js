const express = require("express");
const router = express.Router();
const {
  getAllGeofences,
  createGeofence,
  deleteGeofence,
} = require("../controllers/geofenceController");

router.get("/", getAllGeofences);
router.post("/", createGeofence);
router.delete("/:id", deleteGeofence);

module.exports = router;
