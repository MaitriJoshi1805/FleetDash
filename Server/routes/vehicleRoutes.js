const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

router.post("/addVehicle",vehicleController.addVehicle);
router.get("/allVehicles",vehicleController.getAllVehicles);
router.get("/vehicle/:id",vehicleController.getVehicleById);
router.put("/updateVehicle/:id",vehicleController.updateVehicle);
router.delete("/deleteVehicle/:id",vehicleController.deleteVehicle);

module.exports = router;