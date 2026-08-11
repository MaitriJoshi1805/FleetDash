const Driver = require("../models/Driver");

// Get all drivers
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: drivers.length,
      drivers,
    });
  } catch (error) {
    console.error("getAllDrivers error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single driver
const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    console.error("getDriverById error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create driver
const createDriver = async (req, res) => {
  try {
    const {
      name,
      phone,
      license,
      experience,
      vehicle,
      status,
    } = req.body;

    if (!name || !phone || !license) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, and license are required",
      });
    }

    const driver = await Driver.create({
      name,
      phone,
      license,
      experience,
      vehicle,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Driver created successfully",
      driver,
    });
  } catch (error) {
    console.error("createDriver error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update driver
const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Driver updated successfully",
      driver,
    });
  } catch (error) {
    console.error("updateDriver error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete driver
const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Driver deleted successfully",
    });
  } catch (error) {
    console.error("deleteDriver error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};