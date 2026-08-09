const express = require("express");
const router = express.Router();
const {
  getAllAlerts,
  resolveAlert,
  createAlert,
} = require("../controllers/alertController");

router.get("/", getAllAlerts);
router.put("/:id/resolve", resolveAlert);
router.post("/", createAlert);

module.exports = router;
