const TelemetryBucket = require("../models/TelemetryBucket");
const Vehicle = require("../models/Vehicle");

const addTelemetry = async (req,res) => {
  try{
    const {vehicleId,latitude,longitude,speed,fuelLevel,engineStatus,temprature} = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if(!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const now = new Date();
    const bucketDate = now.toISOString().split("T")[0];
    const hour = now.getHours();

    let bucket = await TelemetryBucket.findOne({
      vehicleId,
      bucketDate,
      hour
    });

    if(bucket) {
      bucket.recods.push({
        latitude,
        longitude,
        speed,
        fuelLevel,
        engineStatus,
        temprature
      });
      await bucket.save();
    }
    else {
      bucket = await TelemetryBucket.create({
        vehicleId,
        bucketDate,
        hour,
        records: [{
          latitude,
          longitude,
          speed,
          fuelLevel,
          engineStatus,
          temprature
        }]
      });
    }

    res.status(201).json({
      success: true,
      message: "Telemetry Saved",
      data: bucket
    });
  } catch(err) {
      res.status(500).json({
        success:false,
        message:error.message
      });
  }
};

const getVehicleHistory = async (req,res) => {
  try {
    const history = await TelemetryBucket.find({
      vehicleId:req.params.vehicleId
    });
    res.status(200).json({
      success: true,
      data: history
    });
  } catch(err) {
    res.status(500).json({
        success:false,
        message:error.message
    });
  }
};

const getLatestTelemetry = async(req,res) => {
  try {
    const latest = await TelemetryBucket.findOne({
      vehicleId: req.params.vehicleId
    })
    .sort({
      createdAt: -1
    });

    res.status(200).json({
      success:true,
      data: latest
    });
  } catch(err) {
    res.status(500).json({
        success:false,
        message:error.message
    });
  }
};

module.exports = {
  addTelemetry,
  getVehicleHistory,
  getLatestTelemetry
};