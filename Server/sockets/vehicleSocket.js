const redisClient = require("../config/redis");

module.exports = (io, socket) => {

    socket.on("vehicle-location", async (data) => {

        await redisClient.set(
            `vehicle:${data.vehicleId}`,
            JSON.stringify(data)
        );

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

        io.emit("vehicle-location", data);

    });

};