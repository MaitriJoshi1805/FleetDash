const express = require("express");
const router = express.Router();
const geofenceController = require("../controllers/geofenceController");

router.post("/addGeofence",geofenceController.addGeofence);
router.get("/allGeofences",geofenceController.getAllGeofences);
router.get("/geofence/:id",geofenceController.getGeofenceById);
router.put("/updateGeofence/:id",geofenceController.updateGeofence);
router.delete("/deleteGeofence/:id",geofenceController.deleteGeofence);

module.exports = router;