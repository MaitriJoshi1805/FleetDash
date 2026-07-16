const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

//middleware for connecting client & server
app.use(cors());
app.use(express.json());

//Route test
app.get("/",(req,res) => {
  res.send("API Running...");
});

app.use("/api/auth",authRoutes);

module.exports = app;