const express = require("express");
const router = express.Router();
const {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} = require("../controllers/driverController");

router.get("/", getAllDrivers);
router.get("/:id", getDriverById);
router.post("/", createDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

module.exports = router;

const driverController = require("../controllers/driverController");

router.post("/addDriver",driverController.addDriver);
router.get("/allDrivers",driverController.getAllDrivers);
router.get("/driver/:id",driverController.getDriverById);
router.put("/updateDriver/:id",driverController.updateDriver);
router.delete("/deleteDriver/:id",driverController.deleteDriver);

module.exports = router;

