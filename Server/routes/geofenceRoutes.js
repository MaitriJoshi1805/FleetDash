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
const geofenceController = require("../controllers/geofenceController");

router.post("/addGeofence",geofenceController.addGeofence);
router.get("/allGeofences",geofenceController.getAllGeofences);
router.get("/geofence/:id",geofenceController.getGeofenceById);
router.put("/updateGeofence/:id",geofenceController.updateGeofence);
router.delete("/deleteGeofence/:id",geofenceController.deleteGeofence);

module.exports = router;
