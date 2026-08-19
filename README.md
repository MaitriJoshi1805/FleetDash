# 🚚 FleetDash

## High-Throughput Event-Driven Fleet Telemetry Dashboard

FleetDash is a real-time fleet telemetry and monitoring dashboard built using the MERN Stack.

The application is designed to help logistics teams monitor vehicles, track live telemetry data, visualize vehicle locations, and receive alerts when vehicles leave predefined geographic areas.

---

## 👥 Team Members

- **Maitri** - Socket.io + Redis + Worker Threads + Backend
- **Sneha** - Backend & Authentication
- **Kamlesh** - React Dashboard + UI
- **Shailesh** - Live Map + Geofencing + Testing

---

## 🚀 Key Features

- 🔐 Admin Authentication
- 🚚 Vehicle Management
- 📊 Real-Time Fleet Dashboard
- ⚡ Real-Time Updates using Socket.io
- 📍 Live Vehicle Location Tracking
- 🗺️ Interactive Map
- 🚨 Geofence Alerts
- ⛽ Vehicle Fuel Monitoring
- 🏃 Vehicle Speed Monitoring
- 🟢 Moving / Stopped / Offline Status
- 🔔 Vehicle Alerts & Notifications
- ⚡ Redis for Real-Time Data Handling
- 🧵 Worker Threads for Background Processing

---

## 🛠️ Technology Stack

### Frontend

- React.js
- React Router
- Axios
- CSS
- Socket.io Client

### Backend

- Node.js
- Express.js
- Socket.io
- JWT
- Bcrypt

### Database

- MongoDB
- Mongoose

### Real-Time & Processing

- Redis
- Worker Threads

### Map & Geofencing

- Leaflet
- OpenStreetMap
- Turf.js

---

## 📊 Dashboard

The FleetDash dashboard provides real-time information about the fleet, including:

- Total Vehicles
- Moving Vehicles
- Stopped Vehicles
- Offline Vehicles
- Vehicle Speed
- Fuel Level
- Current Location
- Recent Alerts

---

## ⚡ Real-Time Vehicle Tracking

FleetDash uses Socket.io to provide real-time vehicle telemetry updates.

Vehicle information such as:

- Location
- Speed
- Fuel
- Status

can be updated without refreshing the browser.

---

## 🗺️ Live Map

The live map displays vehicle locations and allows administrators to monitor the movement of vehicles geographically.

---

## 🚨 Geofencing

FleetDash uses Turf.js to implement geofencing.

A predefined geographic area can be created for a warehouse or assigned zone.

If a vehicle leaves the defined area, the system generates an alert.

Example:

> ⚠️ Truck-102 left the Warehouse Zone

---

## ⚡ Redis

Redis is used for fast data handling and real-time communication between different parts of the backend system.

---

## 🧵 Worker Threads

Worker Threads are used for background processing so that heavy tasks do not block the main Node.js server.

---

## 📁 Project Structure

```text
FleetDash/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── hooks/
│       ├── services/
│       ├── context/
│       └── App.jsx
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   ├── workers/
│   ├── utils/
│   └── server.js
│
└── README.md