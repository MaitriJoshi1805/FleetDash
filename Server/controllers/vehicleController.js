const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");

// Add Vehicle
const addVehicle = async (req,res) => {
    try{
        const { driverId } = req.body;
        const driver = await Driver.findById(driverId);
        if(!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }
        const vehicle = await Vehicle.create(req.body);

        res.status(201).json({
            success: true,
            message: "Vehicle Added Successfully",
            data: vehicle
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get All Vehicles
const getAllVehicles = async(req,res) => {
    try {
        const vehicles = await Vehicle.find.populate("driverId","name");

        res.status(200).json({
           success: true,
           count: vehicle.length,
           data: vehicles 
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get Vehicle By Id
const getVehicleById = async(req,res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate("driverId","name");

        if(!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            success: true,
            data: vehicle
        });

    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Update Vehicle
const updateVehicle = async (req,res) => {
    try{
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators: true
            }
        );

        if(!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            }); 
        }

        res.status(200).json({
            success: true,
            message: "Vehicle Updated Successfully",
            data: vehicle
        });

    } catch(err) { 
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const deleteVehicle = async (req,res) => {
    try{
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if(!vehicle) {
           return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            }); 
        }

        res.status(200).json({
            success: true,
            message: "Vehicle Deleted Successfully",
            data: vehicle
        });

    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    addVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};