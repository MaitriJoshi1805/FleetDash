require("dotenv").config();

const http = require("http");
const app = require("./app");
const initializeSocket = require("./sockets");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});