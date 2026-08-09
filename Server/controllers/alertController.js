const Alert = require("../models/Alert");

const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.status(200).json({ success: true, count: alerts.length, alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );
    if (!alert) return res.status(404).json({ success: false, message: "Alert not found" });
    res.status(200).json({ success: true, message: "Alert marked as resolved", alert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body);
    res.status(201).json({ success: true, message: "Alert created", alert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllAlerts,
  resolveAlert,
  createAlert,
};
