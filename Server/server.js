require("dotenv").config();

<<<<<<< HEAD
const http = require("http");
const app = require("./app");
const initializeSocket = require("./sockets");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
=======
const { connect } = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
})
>>>>>>> origin/main
