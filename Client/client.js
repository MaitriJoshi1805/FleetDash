const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("✅ Connected to server");
    console.log("Socket ID:", socket.id);

    socket.emit("vehicle-location", {
        vehicleId: "TRUCK-101",
        latitude: 19.0760,
        longitude: 72.8777,
        speed: 65
    });
});

socket.on("vehicle-location", (data) => {
    console.log("📍 Location received:", data);
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected");
});