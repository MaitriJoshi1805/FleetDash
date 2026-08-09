import { useEffect, useState } from "react";
import { getVehicles } from "../../services/api";
import socket from "../../services/socket";
import { Link } from "react-router-dom";

function VehicleTable() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicleList = async () => {
    try {
      const res = await getVehicles();
      if (res.data && res.data.vehicles) {
        setVehicles(res.data.vehicles);
      }
    } catch (err) {
      console.error("Error fetching vehicles for VehicleTable:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleList();
  }, []);

  useEffect(() => {
    const handleLocation = (data) => {
      const vId = data.vehicleId || data.vehicleNo;
      setVehicles((prev) => {
        const idx = prev.findIndex((v) => v.vehicleNo === vId);
        if (idx > -1) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            speed: data.speed,
            fuel: data.fuel,
            status: data.status || (Number(data.speed) > 0 ? "Moving" : "Stopped"),
            location: data.location || updated[idx].location,
          };
          return updated;
        } else {
          return [
            {
              _id: vId,
              vehicleNo: vId,
              driver: data.driver || "Driver",
              status: data.status || "Moving",
              speed: data.speed,
              fuel: data.fuel,
              location: "Dynamic GPS",
            },
            ...prev,
          ];
        }
      });
    };

    socket.on("vehicle-location", handleLocation);
    return () => socket.off("vehicle-location", handleLocation);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Live Fleet Telemetry</h2>
          <p className="text-sm text-slate-400">Dynamic database & real-time socket feed</p>
        </div>

        <Link to="/vehicles" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium text-sm">
          Manage All Vehicles
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-700">
            <tr className="text-slate-400 text-sm">
              <th className="py-3 px-4">Vehicle No</th>
              <th className="px-4">Driver</th>
              <th className="px-4">Status</th>
              <th className="px-4">Speed</th>
              <th className="px-4">Fuel</th>
              <th className="px-4">Location</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-slate-400">
                  Loading dynamic vehicle data...
                </td>
              </tr>
            ) : vehicles.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-slate-400">
                  No vehicles found in database.
                </td>
              </tr>
            ) : (
              vehicles.slice(0, 5).map((vehicle) => (
                <tr
                  key={vehicle._id || vehicle.vehicleNo}
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >
                  <td className="py-4 px-4 text-white font-semibold">
                    {vehicle.vehicleNo}
                  </td>

                  <td className="px-4 text-slate-300">
                    {vehicle.driver || "Unassigned"}
                  </td>

                  <td className="px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        vehicle.status === "Online" || vehicle.status === "Moving"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>

                  <td className="px-4 text-white font-medium">
                    {vehicle.speed ?? 0} km/h
                  </td>

                  <td className="px-4 text-white font-medium">
                    {vehicle.fuel ?? 100}%
                  </td>

                  <td className="px-4 text-slate-300 text-sm">
                    {vehicle.location || `${Number(vehicle.latitude || 0).toFixed(2)}, ${Number(vehicle.longitude || 0).toFixed(2)}`}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleTable;