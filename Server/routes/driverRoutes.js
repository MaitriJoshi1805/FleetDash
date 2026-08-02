const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");

router.post("/addDriver",driverController.addDriver);
router.get("/allDrivers",driverController.getAllDrivers);
router.get("/driver/:id",driverController.getDriverById);
router.put("/updateDriver/:id",driverController.updateDriver);
router.delete("/deleteDriver/:id",driverController.deleteDriver);

module.exports = router;