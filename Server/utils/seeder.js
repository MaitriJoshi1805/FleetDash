const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Trip = require("../models/Trip");
const Geofence = require("../models/Geofence");
const Alert = require("../models/Alert");
const redisClient = require("../config/redis");

const seedDatabase = async () => {
  try {
    const vehicleCount = await Vehicle.countDocuments();
    if (vehicleCount === 0) {
      console.log("🌱 Seeding initial vehicles into MongoDB...");
      const initialVehicles = [
        {
          vehicleNo: "TRUCK-101",
          driver: "Rahul Sharma",
          phone: "9876543210",
          type: "Heavy Truck",
          status: "Moving",
          location: "Mumbai Port",
          latitude: 19.0760,
          longitude: 72.8777,
          speed: 65,
          fuel: 98,
          temperature: 82,
          engine: "ON",
        },
        {
          vehicleNo: "TRUCK-102",
          driver: "Amit Patel",
          phone: "9876543211",
          type: "Container",
          status: "Moving",
          location: "Pune Express Way",
          latitude: 18.5204,
          longitude: 73.8567,
          speed: 52,
          fuel: 85,
          temperature: 84,
          engine: "ON",
        },
        {
          vehicleNo: "TRUCK-103",
          driver: "Neha Singh",
          phone: "9876543212",
          type: "Mini Truck",
          status: "Stopped",
          location: "Nashik Hub",
          latitude: 19.9975,
          longitude: 73.7898,
          speed: 0,
          fuel: 75,
          temperature: 78,
          engine: "OFF",
        },
        {
          vehicleNo: "TRUCK-104",
          driver: "Karan Verma",
          phone: "9876543213",
          type: "Trailer",
          status: "Moving",
          location: "Surat Bypass",
          latitude: 21.1702,
          longitude: 72.8311,
          speed: 74,
          fuel: 62,
          temperature: 88,
          engine: "ON",
        },
        {
          vehicleNo: "GJ05AB1234",
          driver: "Shailesh Prajapati",
          phone: "9876543214",
          type: "Cargo Van",
          status: "Online",
          location: "Ahmedabad Highway",
          latitude: 23.0225,
          longitude: 72.5714,
          speed: 45,
          fuel: 90,
          temperature: 80,
          engine: "ON",
        },
      ];

      await Vehicle.insertMany(initialVehicles);

      // Populate Redis initial state
      if (redisClient.isOpen) {
        for (const v of initialVehicles) {
          await redisClient.set(
            `vehicle:${v.vehicleNo}`,
            JSON.stringify({
              vehicleId: v.vehicleNo,
              driver: v.driver,
              latitude: v.latitude,
              longitude: v.longitude,
              speed: v.speed,
              fuel: v.fuel,
              engine: v.engine,
              temperature: v.temperature,
              status: v.status,
              timestamp: new Date().toLocaleTimeString(),
            })
          );
        }
      }
    }

    const driverCount = await Driver.countDocuments();
    if (driverCount === 0) {
      console.log("🌱 Seeding initial drivers...");
      await Driver.insertMany([
        { name: "Shailesh Prajapati", phone: "9876543214", license: "GJ052023001", experience: "5 Years", vehicle: "GJ05AB1234", status: "Active" },
        { name: "Kamlesh Darji", phone: "9988776655", license: "GJ052023002", experience: "8 Years", vehicle: "GJ01XY5678", status: "Active" },
        { name: "Rahul Sharma", phone: "9876543210", license: "MH122022003", experience: "4 Years", vehicle: "TRUCK-101", status: "Active" },
        { name: "Amit Patel", phone: "9876543211", license: "MH122022004", experience: "6 Years", vehicle: "TRUCK-102", status: "Active" },
        { name: "Neha Singh", phone: "9876543212", license: "MH122022005", experience: "3 Years", vehicle: "TRUCK-103", status: "Active" },
        { name: "Karan Verma", phone: "9876543213", license: "GJ052023006", experience: "7 Years", vehicle: "TRUCK-104", status: "Active" },
      ]);
    }

    const tripCount = await Trip.countDocuments();
    if (tripCount === 0) {
      console.log("🌱 Seeding initial trips...");
      await Trip.insertMany([
        { tripId: "TRIP001", vehicle: "TRUCK-101", driver: "Rahul Sharma", source: "Mumbai Port", destination: "Surat Logistics Center", startTime: "08:00 AM", endTime: "04:00 PM", status: "Running" },
        { tripId: "TRIP002", vehicle: "TRUCK-102", driver: "Amit Patel", source: "Pune Hub", destination: "Ahmedabad Depot", startTime: "09:30 AM", endTime: "06:00 PM", status: "Running" },
        { tripId: "TRIP003", vehicle: "GJ05AB1234", driver: "Shailesh Prajapati", source: "Surat", destination: "Vadodara", startTime: "07:00 AM", endTime: "12:00 PM", status: "Pending" },
      ]);
    }

    const geofenceCount = await Geofence.countDocuments();
    if (geofenceCount === 0) {
      console.log("🌱 Seeding initial geofences...");
      await Geofence.insertMany([
        {
          name: "Mumbai Logistics Hub",
          shapeType: "Circle",
          center: { latitude: 19.0760, longitude: 72.8777 },
          radius: 10000,
          color: "#3b82f6",
          status: "Active",
          description: "Primary Port and Cargo Clearance Zone",
        },
        {
          name: "Surat Central Depot",
          shapeType: "Circle",
          center: { latitude: 21.1702, longitude: 72.8311 },
          radius: 8000,
          color: "#10b981",
          status: "Active",
          description: "Main Distribution Center",
        },
      ]);
    }

    const alertCount = await Alert.countDocuments();
    if (alertCount === 0) {
      console.log("🌱 Seeding initial alerts...");
      await Alert.insertMany([
        {
          vehicleId: "TRUCK-104",
          driver: "Karan Verma",
          alertType: "Overspeed",
          message: "Vehicle speed exceeded 80 km/h threshold (recorded 85 km/h)",
          severity: "Warning",
          location: { latitude: 21.1702, longitude: 72.8311 },
          status: "Active",
          timestamp: new Date(),
        },
      ]);
    }
  } catch (error) {
    console.error("Database seeding error:", error);
  }
};

module.exports = seedDatabase;
