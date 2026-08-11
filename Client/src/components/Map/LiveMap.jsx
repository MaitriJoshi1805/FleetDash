import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import socket from "../../services/socket";
import { getVehicles, getGeofences } from "../../services/api";
import { MdDirectionsCar, MdLocationOn } from "react-icons/md";

// Create custom colored DivIcon for vehicles
const createVehicleIcon = (status, vehicleNo) => {
  const isOnline = status === "Online" || status === "Moving";
  const color = isOnline ? "#10b981" : "#ef4444";
  const bg = isOnline ? "bg-emerald-500" : "bg-red-500";

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div class="relative flex items-center justify-center">
        <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full ${bg} opacity-75"></span>
        <div class="relative flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-xs shadow-lg shadow-black/50 border-2 border-slate-900" style="background-color: ${color};">
          🚚
        </div>
        <div class="absolute -bottom-5 bg-slate-900/90 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded shadow border border-slate-700 whitespace-nowrap">
          ${vehicleNo}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

function LiveMap({ selectedVehicleId }) {
  const [vehicles, setVehicles] = useState([]);
  const [geofences, setGeofences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial load from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vRes, gRes] = await Promise.all([getVehicles(), getGeofences()]);
        if (vRes.data && vRes.data.vehicles) {
          setVehicles(vRes.data.vehicles);
        }
        if (gRes.data && gRes.data.geofences) {
          setGeofences(gRes.data.geofences);
        }
      } catch (err) {
        console.error("Error fetching map data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Listen for real-time telemetry updates via Socket.IO
  useEffect(() => {
    const handleVehicleLocation = (data) => {
      const vId = data.vehicleId || data.vehicleNo;
      setVehicles((prev) => {
        const existingIndex = prev.findIndex((v) => v.vehicleNo === vId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
            speed: Number(data.speed),
            fuel: Number(data.fuel),
            temperature: Number(data.temperature),
            engine: data.engine || updated[existingIndex].engine,
            status: data.status || (Number(data.speed) > 0 ? "Moving" : "Stopped"),
            lastUpdated: new Date().toLocaleTimeString(),
          };
          return updated;
        } else {
          // New vehicle dynamically added
          return [
            ...prev,
            {
              _id: vId,
              vehicleNo: vId,
              driver: data.driver || "Driver",
              latitude: Number(data.latitude),
              longitude: Number(data.longitude),
              speed: Number(data.speed),
              fuel: Number(data.fuel),
              status: data.status || "Moving",
              engine: data.engine || "ON",
              temperature: data.temperature || 80,
            },
          ];
        }
      });
    };

    socket.on("vehicle-location", handleVehicleLocation);

    return () => {
      socket.off("vehicle-location", handleVehicleLocation);
    };
  }, []);

  // Center on Mumbai by default
  const defaultCenter = [19.0760, 72.8777];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg h-[450px] flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur z-10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MdLocationOn className="text-blue-500" /> Live Interactive Fleet Map
          </h2>
          <p className="text-sm text-slate-400">
            Real-time dynamic vehicle telemetry & geofence tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Real-Time Socket
          </span>
          <span className="text-slate-400 text-xs font-medium">
            Vehicles: <strong className="text-white">{vehicles.length}</strong>
          </span>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div className="flex-1 w-full h-full relative">
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
            <MdLocationOn size={60} className="text-blue-500 animate-bounce" />
            <span className="mt-2 text-lg">Loading Dynamic Map & Vehicles...</span>
          </div>
        ) : (
          <MapContainer
            center={defaultCenter}
            zoom={6}
            style={{ width: "100%", height: "100%", borderRadius: "0 0 1rem 1rem" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            {/* Geofence zones */}
            {geofences.map((gf) => {
              if (gf.shapeType === "Circle" && gf.center?.latitude && gf.center?.longitude) {
                return (
                  <Circle
                    key={gf._id || gf.name}
                    center={[gf.center.latitude, gf.center.longitude]}
                    radius={gf.radius || 10000}
                    pathOptions={{ color: gf.color || "#3b82f6", fillColor: gf.color || "#3b82f6", fillOpacity: 0.15 }}
                  >
                    <Popup>
                      <div className="text-slate-900 p-1">
                        <strong className="block text-blue-600 text-sm">{gf.name}</strong>
                        <p className="text-xs text-slate-600">{gf.description || "Active Geofence Zone"}</p>
                        <span className="text-[10px] text-slate-500">Radius: {(gf.radius / 1000).toFixed(1)} km</span>
                      </div>
                    </Popup>
                  </Circle>
                );
              }
              return null;
            })}

            {/* Dynamic Vehicle Markers */}
            {vehicles.map((vehicle) => {
              const lat = Number(vehicle.latitude);
              const lng = Number(vehicle.longitude);
              if (isNaN(lat) || isNaN(lng)) return null;

              return (
                <Marker
                  key={vehicle._id || vehicle.vehicleNo}
                  position={[lat, lng]}
                  icon={createVehicleIcon(vehicle.status, vehicle.vehicleNo)}
                >
                  <Popup>
                    <div className="text-slate-900 p-2 min-w-[200px]">
                      <div className="flex items-center justify-between border-b pb-2 mb-2">
                        <h4 className="font-bold text-slate-800 text-base flex items-center gap-1">
                          🚚 {vehicle.vehicleNo}
                        </h4>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          vehicle.status === "Online" || vehicle.status === "Moving"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {vehicle.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-slate-700">
                        <p><strong>Driver:</strong> {vehicle.driver || "Unassigned"}</p>
                        <p><strong>Speed:</strong> {vehicle.speed || 0} km/h</p>
                        <p><strong>Fuel Level:</strong> {vehicle.fuel || 100}%</p>
                        <p><strong>Engine Temp:</strong> {vehicle.temperature || 80}°C</p>
                        <p><strong>Engine State:</strong> {vehicle.engine || "ON"}</p>
                        <p className="text-[10px] text-slate-400 border-t pt-1 mt-1">
                          Location: {lat.toFixed(4)}, {lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </div>
  );
}

export default LiveMap;
