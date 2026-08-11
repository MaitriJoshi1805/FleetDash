const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

const {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

router.post("/addVehicle",vehicleController.addVehicle);
router.get("/allVehicles",vehicleController.getAllVehicles);
router.get("/vehicle/:id",vehicleController.getVehicleById);
router.put("/updateVehicle/:id",vehicleController.updateVehicle);
router.delete("/deleteVehicle/:id",vehicleController.deleteVehicle);

module.exports = router;