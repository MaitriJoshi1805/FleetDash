const { Server } = require("socket.io");
const registerVehicleSocket = require("./vehicleSocket");

const initializeSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {

        console.log(`✅ Client Connected: ${socket.id}`);

        registerVehicleSocket(io, socket);

        socket.on("disconnect", () => {
            console.log(`❌ Client Disconnected: ${socket.id}`);
        });

    });

    return io;
};

module.exports = initializeSocket;