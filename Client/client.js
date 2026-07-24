const { io } = require("socket.io-client");
const vehicles = require("./vehicles");

const socket = io("http://localhost:5000");

socket.on("connect", () => {

    console.log("✅ Connected to FleetDash Server");

    setInterval(() => {

        vehicles.forEach(vehicle => {

            vehicle.latitude += 0.0005;
            vehicle.longitude += 0.0005;

            vehicle.fuel = Math.max(0, vehicle.fuel - 0.1);

            socket.emit("vehicle-location", {

                vehicleId: vehicle.vehicleId,
                driver: vehicle.driver,
                latitude: vehicle.latitude,
                longitude: vehicle.longitude,
                speed: Math.floor(Math.random() * 30) + 50,
                fuel: vehicle.fuel.toFixed(1),
                engine: "ON",
                temperature: Math.floor(Math.random() * 10) + 80,
                status: "Moving",
                timestamp: new Date().toLocaleTimeString()

            });

        });

    }, 2000);

});

socket.on("vehicle-location", (data) => {
    console.log(
        `${data.vehicleId} | ${data.driver} | Speed: ${data.speed} km/h | Fuel: ${data.fuel}%`
    );
});