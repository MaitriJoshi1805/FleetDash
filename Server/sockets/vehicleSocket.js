const { Worker } = require("worker_threads");
const path = require("path");
const redisClient = require("../config/redis");

// Create Worker Thread
const worker = new Worker(
    path.join(__dirname, "../workers/vehicleWorker.js")
);

module.exports = (io, socket) => {

    // Receive vehicle data
    socket.on("vehicle-location", async (data) => {

        // Save latest vehicle data in Redis
        await redisClient.set(
            `vehicle:${data.vehicleId}`,
            JSON.stringify(data)
        );

        // Send data to Worker Thread
        worker.postMessage(data);

        console.log("=================================");
        console.log("Vehicle:", data.vehicleId);
        console.log("Driver :", data.driver);
        console.log("Speed  :", data.speed, "km/h");
        console.log("Fuel   :", data.fuel + "%");
        console.log("Lat    :", data.latitude);
        console.log("Lng    :", data.longitude);
        console.log("Status :", data.status);
        console.log("Engine :", data.engine);
        console.log("Temp   :", data.temperature + "°C");
        console.log("Time   :", data.timestamp);
        console.log("=================================");

        // Send live data to all connected clients
        io.emit("vehicle-location", data);

    });

    // Receive alerts from Worker Thread
    worker.on("message", (result) => {

        if (result.alerts.length > 0) {

            console.log("\n🚨 ALERT 🚨");
            console.log("Vehicle :", result.vehicleId);
            console.log("Alerts  :", result.alerts.join(", "));
            console.log("-----------------------------");

            // Send alerts to frontend
            io.emit("vehicle-alert", result);
        }

    });

    worker.on("error", (err) => {
        console.error("❌ Worker Error:", err);
    });

    worker.on("exit", (code) => {
        console.log(`Worker exited with code ${code}`);
    });

};