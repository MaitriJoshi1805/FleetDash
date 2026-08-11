const { Worker } = require("worker_threads");
const path = require("path");
const redisClient = require("../config/redis");
const Vehicle = require("../models/Vehicle");
const Alert = require("../models/Alert");

// Create Worker Thread
const worker = new Worker(
    path.join(__dirname, "../workers/vehicleWorker.js")
);

module.exports = (io, socket) => {

    // Receive vehicle telemetry
    socket.on("vehicle-location", async (data) => {
        try {
            const vehicleId = data.vehicleId || data.vehicleNo;
            if (!vehicleId) return;

            // 1. Save latest vehicle data in Redis
            try {
                if (redisClient.isOpen) {
                    await redisClient.set(
                        `vehicle:${vehicleId}`,
                        JSON.stringify({ ...data, vehicleId })
                    );
                }
            } catch (redisErr) {
                console.warn("Redis socket set error:", redisErr.message);
            }

            // 2. Persist/update vehicle position & telemetry in MongoDB
            await Vehicle.findOneAndUpdate(
                { vehicleNo: vehicleId },
                {
                    driver: data.driver || "Unassigned",
                    latitude: Number(data.latitude),
                    longitude: Number(data.longitude),
                    speed: Number(data.speed),
                    fuel: Number(data.fuel),
                    temperature: Number(data.temperature),
                    engine: data.engine || "ON",
                    status: data.status || (Number(data.speed) > 0 ? "Moving" : "Stopped"),
                    lastUpdated: new Date(),
                },
                { upsert: true, new: true }
            );

            // 3. Send telemetry data to Worker Thread for analysis
            worker.postMessage({ ...data, vehicleId });

            console.log(`[SOCKET TELEMETRY] ${vehicleId} | Driver: ${data.driver} | Speed: ${data.speed}km/h | Lat: ${data.latitude}, Lng: ${data.longitude}`);

            // 4. Broadcast live location update to all frontend clients
            io.emit("vehicle-location", { ...data, vehicleId });
        } catch (err) {
            console.error("Error processing vehicle-location socket event:", err);
        }
    });

    // Receive alert reports from Worker Thread
    worker.on("message", async (result) => {
        try {
            if (result.alerts && result.alerts.length > 0) {
                for (const alertMsg of result.alerts) {
                    let severity = "Warning";
                    if (alertMsg.includes("Overspeed") || alertMsg.includes("Exit")) severity = "Critical";

                    // Save Alert in MongoDB
                    await Alert.create({
                        vehicleId: result.vehicleId,
                        driver: result.driver || "Fleet Driver",
                        alertType: alertMsg.split(":")[0] || alertMsg,
                        message: alertMsg,
                        severity,
                        location: {
                            latitude: result.latitude,
                            longitude: result.longitude,
                        },
                        status: "Active",
                        timestamp: new Date(),
                    });
                }

                console.log(`🚨 ALERT GENERATED for ${result.vehicleId}: ${result.alerts.join(", ")}`);

                // Broadcast alert to frontend clients
                io.emit("vehicle-alert", result);
            }
        } catch (alertErr) {
            console.error("Error saving worker alert to MongoDB:", alertErr);
        }
    });

    worker.on("error", (err) => {
        console.error("❌ Worker Error:", err);
    });

    worker.on("exit", (code) => {
        console.log(`Worker exited with code ${code}`);
    });

};