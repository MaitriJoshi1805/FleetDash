const Geofence = require("../models/Geofence");

const getAllGeofences = async (req, res) => {
  try {
    const geofences = await Geofence.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: geofences.length, geofences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createGeofence = async (req, res) => {
  try {
    const geofence = await Geofence.create(req.body);
    res.status(201).json({ success: true, message: "Geofence created", geofence });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteGeofence = async (req, res) => {
  try {
    const geofence = await Geofence.findByIdAndDelete(req.params.id);
    if (!geofence) return res.status(404).json({ success: false, message: "Geofence not found" });
    res.status(200).json({ success: true, message: "Geofence deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllGeofences,
  createGeofence,
  deleteGeofence,
};
