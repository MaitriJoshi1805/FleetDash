const express = require("express");
const router = express.Router();
const telemetryController = require("../controllers/telemetryController");

router.post("/addTelemetry",telemetryController.addTelemetry);
router.get("/history/:id",telemetryController.getVehicleHistory);
router.get("/latest/:id",telemetryController.getLatestTelemetry);

module.exports = router;