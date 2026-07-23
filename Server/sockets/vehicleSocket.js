const registerVehicleSocket = (io, socket) => {

    socket.on("vehicle-location", (data) => {

        console.log("📍 Vehicle Location:", data);

        io.emit("vehicle-location", data);

    });

};

module.exports = registerVehicleSocket;