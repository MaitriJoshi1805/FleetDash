const { io } = require("socket.io-client");
const http = require("http");
let fallbackVehicles = require("./vehicles");

const socket = io("http://localhost:5000");

let activeVehicles = [];

const fetchDbVehicles = () => {
    http.get("http://localhost:5000/api/vehicles", (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
            try {
                const parsed = JSON.parse(data);
                if (parsed.vehicles && parsed.vehicles.length > 0) {
                    activeVehicles = parsed.vehicles.map((v) => ({
                        vehicleId: v.vehicleNo,
                        driver: v.driver || "Fleet Driver",
                        latitude: Number(v.latitude || 19.076),
                        longitude: Number(v.longitude || 72.8777),
                        speed: Number(v.speed || 50),
                        fuel: Number(v.fuel || 90),
                        temperature: Number(v.temperature || 80),
                        engine: v.engine || "ON",
                        status: v.status || "Moving",
                    }));
                } else {
                    activeVehicles = fallbackVehicles;
                }
            } catch (err) {
                activeVehicles = fallbackVehicles;
            }
        });
    }).on("error", () => {
        activeVehicles = fallbackVehicles;
    });
};

socket.on("connect", () => {
    console.log("✅ Simulation Client connected to FleetDash Server");

    fetchDbVehicles();

    setInterval(() => {
        if (activeVehicles.length === 0) {
            fetchDbVehicles();
            return;
        }

        activeVehicles.forEach((vehicle) => {
            vehicle.latitude += (Math.random() - 0.48) * 0.002;
            vehicle.longitude += (Math.random() - 0.48) * 0.002;
            vehicle.fuel = Math.max(5, vehicle.fuel - 0.05);
            vehicle.speed = Math.floor(Math.random() * 35) + 50;
            vehicle.temperature = Math.floor(Math.random() * 8) + 80;

            socket.emit("vehicle-location", {
                vehicleId: vehicle.vehicleId,
                driver: vehicle.driver,
                latitude: vehicle.latitude,
                longitude: vehicle.longitude,
                speed: vehicle.speed,
                fuel: Number(vehicle.fuel.toFixed(1)),
                engine: "ON",
                temperature: vehicle.temperature,
                status: vehicle.speed > 0 ? "Moving" : "Stopped",
                timestamp: new Date().toLocaleTimeString(),
            });
        });
    }, 2500);
});

socket.on("vehicle-location", (data) => {
    console.log(
        `📡 [SIMULATOR TELEMETRY] ${data.vehicleId} | Driver: ${data.driver} | Speed: ${data.speed} km/h | Fuel: ${data.fuel}%`
    );
});