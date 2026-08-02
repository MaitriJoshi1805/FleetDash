const Driver = require("../models/Driver");

// Add Drivers
const addDriver = async (req,res) => {
  try{
    const driver = await Driver.create(req.body);

    res.status(201).json({
      success: true,
      message: "Driver Added Successfully",
      data: driver
    });
  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Get All Drivers
const getAllDrivers = async (req,res) => {
  try{
    const drivers = await Driver.find();

    res.status(200).json({
      success: true,
      count: drivers.length,
      data: drivers
    });
  } catch(err) { 
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Get Driver By Id
const getDriverById = async (req,res) => {
  try{
    const driver = await Driver.findById(req.params.id);

    if(!driver){
      return res.status(400).json({
        success: false,
        message: "Driver Not Found"
      });
    }
    res.status(200).json({
      success: true,
      data: driver
    });
  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Update Driver
const updateDriver = async (req,res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:true,
        runValidators: true
      }
    );

    if(!driver) {
      return res.status(400).json({
        success: false,
        message: "Driver Not Found"
      });
    }

    res.success(200).json({
      success: true,
      message: "Driver Updated Successfully",
      data: driver
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Delete Driver
const deleteDriver = async (req,res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);

    if(!driver) {
      return res.status(400).json({
        success: false,
        message: "Driver Not Found"
      });
    }

    res.success(200).json({
      success: true,
      message: "Driver Deleted Successfully",
      data: driver
    });
  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  addDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver
};