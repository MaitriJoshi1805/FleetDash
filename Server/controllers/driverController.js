const Driver = require("../models/Driver");

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: drivers.length, drivers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.status(200).json({ success: true, driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDriver = async (req, res) => {
  try {
    const { name, phone, license, experience, vehicle, status } = req.body;
    if (!name || !phone || !license) {
      return res.status(400).json({ success: false, message: "Name, phone, and license are required" });
    }
    const driver = await Driver.create({ name, phone, license, experience, vehicle, status });
    res.status(201).json({ success: true, message: "Driver created", driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.status(200).json({ success: true, message: "Driver updated", driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.status(200).json({ success: true, message: "Driver deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};
