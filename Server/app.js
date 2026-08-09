const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const driverRoutes = require("./routes/driverRoutes");
const tripRoutes = require("./routes/tripRoutes");
const geofenceRoutes = require("./routes/geofenceRoutes");
const alertRoutes = require("./routes/alertRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const driverRoutes = require("./routes/driverRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const geofenceRoutes = require("./routes/geofenceRoutes");
const telemetryRoutes = require("./routes/telemetryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FleetDash Backend Running");
});

// API Routes
app.use("/api/auth", authRoutes);
//********************************************************************************************************************
//********************************************************************************************************************
//**************************************Routes Statrt*****************************************************************
//********************************************************************************************************************
//********************************************************************************************************************

//Driver Routes
app.use("/api/drivers",driverRoutes);

// Vehicle Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/geofences", geofenceRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Geofence Routes
app.use("/api/geofence",geofenceRoutes);

// Telemetry Routes
app.use("/api/telemetry",telemetryRoutes);

//********************************************************************************************************************
//********************************************************************************************************************
//**************************************Routes End********************************************************************
//********************************************************************************************************************
//********************************************************************************************************************

module.exports = app;