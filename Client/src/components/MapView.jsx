import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useTheme } from "../context/ThemeContext";
import L from "leaflet";
import truckIconImg from "../assets/truck-marker.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


function MapView() {

    const [vehicles, setVehicles] = useState([
  {
    id: 1,
    number: "GJ05AB1234",
    driver: "SP",
    position: [20.9467, 72.9520],
    speed: 60,
  },
  {
    id: 2,
    number: "GJ05XY5678",
    driver: "Kamlesh",
    position: [20.9510, 72.9565],
    speed: 45,
  },
  {
    id: 3,
    number: "GJ05CD9012",
    driver: "Rakesh",
    position: [20.9485, 72.9615],
    speed: 72,
  },
]);

    const truckIcon = new L.Icon({
        iconUrl: truckIconImg,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35],
    });

    const route = [
    [20.9467, 72.9520],
    [20.9485, 72.9550],
    [20.9508, 72.9585],
    [20.9525, 72.9620],
    [20.9548, 72.9655],
    [20.9520, 72.9690],
    ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const { theme } = useTheme();
  const position = [20.9467, 72.9520]; // Navsari

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % route.length);
  }, 2000);

  return () => clearInterval(interval);
}, []);

  delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    });

  return (
    <div
    className={`rounded-2xl border p-4 ${
        theme === "dark"
        ? "bg-slate-900 border-slate-800"
        : "bg-white border-gray-300"
    }`}
    >
      <h2
        className={`text-2xl font-bold ${
            theme === "dark"
            ? "text-white"
            : "text-gray-900"
        }`}>
        Live Fleet Map
      </h2>

      <MapContainer
        center={position}
        zoom={13}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {vehicles.map((vehicle) => (
        <Marker
            key={vehicle.id}
            position={
            vehicle.id === 1
                ? route[currentIndex]
                : vehicle.position
            }
            icon={truckIcon}>
            <Popup>
            <strong>{vehicle.number}</strong>
            <br />
            Driver: {vehicle.driver}
            <br />
            Speed: {vehicle.speed} km/h
            </Popup>
        </Marker>
        ))}

      </MapContainer>
    </div>
  );
}

export default MapView;