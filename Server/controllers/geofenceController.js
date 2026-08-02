const Geofence = require("../models/Geofence");

//Add Geofence
const addGeofence = async (req,res) => {
  try {
    const geofence = await Geofence.create(req.body);

    res.status(201).json({
      success: true,
      message: "Geofence Added Successfully",
      data: geofence
    });
  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Get All geofences
const getAllGeofences = async (req,res) => {
  try {
    const geofences = await Geofence.find();

    res.status(200).json({
      success: true,
      count: geofences.length,
      data: geofences
    });

  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Get Geofence by id
const getGeofenceById = async (req,res) => {
  try {
    const geofence = await Geofence.findById(req.params.id);

    if(!geofence) {
      return res.status(404).json({
        success: false,
        message: "Geofence not found"
      });
    }

    res.status(200).json({
      success: true,
      data: geofence
    });

  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Update Geofence
const updateGeofence = async (req,res) => {
  try {
    const geofence = await Geofence.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if(!geofence) {
      return res.status(404).json({
        success: false,
        message: "Geofence not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Geofence Updated Successfully",
      data: geofence
    });

  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Delete Geofence
const deleteGeofence = async (req,res) => {
  try {
    const geofence = await Geofence.findByIdAndDelete(req.params.id);

    if(!geofence) {
      return res.status(404).json({
        success: false,
        message: "Geofence not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Geofence Deleted Successfully",
      data: geofence
    });

  } catch(err) { 
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  addGeofence,
  getAllGeofences,
  getGeofenceById,
  updateGeofence,
  deleteGeofence
};