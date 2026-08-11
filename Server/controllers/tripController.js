const Trip = require("../models/Trip");

const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: trips.length, trips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: "Trip not found" });
    res.status(200).json({ success: true, trip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTrip = async (req, res) => {
  try {
    const { tripId, vehicle, driver, source, destination, startTime, endTime, status } = req.body;
    if (!tripId || !vehicle || !driver) {
      return res.status(400).json({ success: false, message: "Trip ID, vehicle, and driver are required" });
    }
    const trip = await Trip.create({ tripId, vehicle, driver, source, destination, startTime, endTime, status });
    res.status(201).json({ success: true, message: "Trip created", trip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trip) return res.status(404).json({ success: false, message: "Trip not found" });
    res.status(200).json({ success: true, message: "Trip updated", trip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: "Trip not found" });
    res.status(200).json({ success: true, message: "Trip deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
};
