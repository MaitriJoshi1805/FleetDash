const { parentPort } = require("worker_threads");

parentPort.on("message", (vehicle) => {
    const alerts = [];

    // Speed check
    if (vehicle.speed > 80) {
        alerts.push(`Overspeed: Speed was ${vehicle.speed} km/h (limit: 80 km/h)`);
    }

    // Fuel check
    if (parseFloat(vehicle.fuel) < 20) {
        alerts.push(`Low Fuel: Fuel level at ${vehicle.fuel}%`);
    }

    // Temperature check
    if (vehicle.temperature > 90) {
        alerts.push(`High Temperature: Engine temp reached ${vehicle.temperature}°C`);
    }

    // Geofence check example (if vehicle latitude/longitude goes out of standard bounds)
    if (vehicle.latitude && vehicle.longitude) {
        // Sample Geofence boundary around India Western Corridor (lat 15-25, lng 70-76)
        if (vehicle.latitude < 15 || vehicle.latitude > 26 || vehicle.longitude < 68 || vehicle.longitude > 78) {
            alerts.push(`Geofence Exit: Vehicle exited designated operational corridor`);
        }
    }

    if (alerts.length > 0) {
        parentPort.postMessage({
            vehicleId: vehicle.vehicleId || vehicle.vehicleNo,
            driver: vehicle.driver,
            latitude: vehicle.latitude,
            longitude: vehicle.longitude,
            alerts,
        });
    }
});