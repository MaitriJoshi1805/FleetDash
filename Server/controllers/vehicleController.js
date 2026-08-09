const Vehicle = require("../models/Vehicle");
const redisClient = require("../config/redis");

// Get all vehicles from MongoDB (merged with latest Redis telemetry)
const getAllVehicles = async (req, res) => {
  try {
    let vehicles = await Vehicle.find().sort({ createdAt: -1 }).lean();

    // Try merging latest telemetry from Redis if available
    try {
      if (redisClient.isOpen) {
        for (let i = 0; i < vehicles.length; i++) {
          const key = `vehicle:${vehicles[i].vehicleNo}`;
          const cachedDataStr = await redisClient.get(key);
          if (cachedDataStr) {
            const cached = JSON.parse(cachedDataStr);
            vehicles[i] = {
              ...vehicles[i],
              latitude: cached.latitude ?? vehicles[i].latitude,
              longitude: cached.longitude ?? vehicles[i].longitude,
              speed: cached.speed ?? vehicles[i].speed,
              fuel: cached.fuel ?? vehicles[i].fuel,
              status: cached.status ?? vehicles[i].status,
              engine: cached.engine ?? vehicles[i].engine,
              temperature: cached.temperature ?? vehicles[i].temperature,
            };
          }
        }
      }
    } catch (redisErr) {
      console.warn("Redis read warning:", redisErr.message);
    }

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    console.error("getAllVehicles error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch vehicles",
      error: error.message,
    });
  }
};

// Get single vehicle
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }
    res.status(200).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new vehicle
const createVehicle = async (req, res) => {
  try {
    const { vehicleNo, driver, phone, type, fuel, status, location, latitude, longitude } = req.body;
    if (!vehicleNo) {
      return res.status(400).json({ success: false, message: "Vehicle Number is required" });
    }

    const existing = await Vehicle.findOne({ vehicleNo });
    if (existing) {
      return res.status(400).json({ success: false, message: "Vehicle already exists" });
    }

    const newVehicle = await Vehicle.create({
      vehicleNo,
      driver: driver || "Unassigned",
      phone: phone || "",
      type: type || "Truck",
      fuel: fuel ? Number(fuel) : 100,
      status: status || "Online",
      location: location || "HQ Depot",
      latitude: latitude ? Number(latitude) : 19.076,
      longitude: longitude ? Number(longitude) : 72.8777,
    });

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error("createVehicle error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update vehicle
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    // Also update Redis key if Redis is open
    try {
      if (redisClient.isOpen) {
        await redisClient.set(
          `vehicle:${vehicle.vehicleNo}`,
          JSON.stringify({
            vehicleId: vehicle.vehicleNo,
            driver: vehicle.driver,
            latitude: vehicle.latitude,
            longitude: vehicle.longitude,
            speed: vehicle.speed,
            fuel: vehicle.fuel,
            engine: vehicle.engine,
            temperature: vehicle.temperature,
            status: vehicle.status,
            timestamp: new Date().toLocaleTimeString(),
          })
        );
      }
    } catch (redisErr) {
      console.warn("Redis update warning:", redisErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete vehicle
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    try {
      if (redisClient.isOpen) {
        await redisClient.del(`vehicle:${vehicle.vehicleNo}`);
      }
    } catch (redisErr) {
      console.warn("Redis del warning:", redisErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};