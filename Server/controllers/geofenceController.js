const Geofence = require("../models/Geofence");

// Get all geofences
const getAllGeofences = async (req, res) => {
  try {
    const geofences = await Geofence.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: geofences.length,
      geofences,
    });
  } catch (error) {
    console.error("getAllGeofences error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get geofence by ID
const getGeofenceById = async (req, res) => {
  try {
    const geofence = await Geofence.findById(req.params.id);

    if (!geofence) {
      return res.status(404).json({
        success: false,
        message: "Geofence not found",
      });
    }

    res.status(200).json({
      success: true,
      geofence,
    });
  } catch (error) {
    console.error("getGeofenceById error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create / Add geofence
const createGeofence = async (req, res) => {
  try {
    const geofence = await Geofence.create(req.body);

    res.status(201).json({
      success: true,
      message: "Geofence created successfully",
      geofence,
    });
  } catch (error) {
    console.error("createGeofence error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update geofence
const updateGeofence = async (req, res) => {
  try {
    const geofence = await Geofence.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!geofence) {
      return res.status(404).json({
        success: false,
        message: "Geofence not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Geofence updated successfully",
      geofence,
    });
  } catch (error) {
    console.error("updateGeofence error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete geofence
const deleteGeofence = async (req, res) => {
  try {
    const geofence = await Geofence.findByIdAndDelete(req.params.id);

    if (!geofence) {
      return res.status(404).json({
        success: false,
        message: "Geofence not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Geofence deleted successfully",
      geofence,
    });
  } catch (error) {
    console.error("deleteGeofence error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllGeofences,
  getGeofenceById,
  createGeofence,
  updateGeofence,
  deleteGeofence,
};