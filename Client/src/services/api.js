import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Vehicle API calls
export const getVehicles = () => api.get("/vehicles");
export const createVehicleApi = (data) => api.post("/vehicles", data);
export const updateVehicleApi = (id, data) => api.put(`/vehicles/${id}`, data);
export const deleteVehicleApi = (id) => api.delete(`/vehicles/${id}`);

// Driver API calls
export const getDrivers = () => api.get("/drivers");
export const createDriverApi = (data) => api.post("/drivers", data);
export const updateDriverApi = (id, data) => api.put(`/drivers/${id}`, data);
export const deleteDriverApi = (id) => api.delete(`/drivers/${id}`);

// Trip API calls
export const getTrips = () => api.get("/trips");
export const createTripApi = (data) => api.post("/trips", data);
export const updateTripApi = (id, data) => api.put(`/trips/${id}`, data);
export const deleteTripApi = (id) => api.delete(`/trips/${id}`);

// Geofence API calls
export const getGeofences = () => api.get("/geofences");
export const createGeofenceApi = (data) => api.post("/geofences", data);
export const deleteGeofenceApi = (id) => api.delete(`/geofences/${id}`);

// Alert API calls
export const getAlerts = () => api.get("/alerts");
export const resolveAlertApi = (id) => api.put(`/alerts/${id}/resolve`);

// Dashboard API calls
export const getDashboardStatsApi = () => api.get("/dashboard/stats");

export default api;