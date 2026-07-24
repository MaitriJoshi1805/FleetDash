const { parentPort } = require("worker_threads");

parentPort.on("message", (vehicle) => {

    const alerts = [];

    if (vehicle.speed > 80) {
        alerts.push("Overspeed");
    }

    if (parseFloat(vehicle.fuel) < 20) {
        alerts.push("Low Fuel");
    }

    if (vehicle.temperature > 90) {
        alerts.push("High Temperature");
    }

    parentPort.postMessage({
        vehicleId: vehicle.vehicleId,
        alerts
    });

});