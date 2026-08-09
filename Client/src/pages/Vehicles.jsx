import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import AddVehicleModal from "../components/Modals/AddVehicleModal";
import ViewVehicleModal from "../components/Modals/ViewVehicleModal";
import { getVehicles, createVehicleApi, updateVehicleApi, deleteVehicleApi } from "../services/api";
import socket from "../services/socket";

function Vehicles() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchVehicleList = async () => {
    try {
      setLoading(true);
      const res = await getVehicles();
      if (res.data && res.data.vehicles) {
        setVehicles(res.data.vehicles);
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setErrorMsg("Failed to load vehicles from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleList();
  }, []);

  // Socket listener for real-time telemetry updates
  useEffect(() => {
    const handleLocationUpdate = (data) => {
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
        }
        return prev;
      });
    };

    socket.on("vehicle-location", handleLocationUpdate);
    return () => socket.off("vehicle-location", handleLocationUpdate);
  }, []);

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      (vehicle.vehicleNo && vehicle.vehicleNo.toLowerCase().includes(search.toLowerCase())) ||
      (vehicle.driver && vehicle.driver.toLowerCase().includes(search.toLowerCase()))
  );

  const addVehicle = async (vehicleData) => {
    try {
      const res = await createVehicleApi(vehicleData);
      if (res.data && res.data.vehicle) {
        setVehicles((prev) => [res.data.vehicle, ...prev]);
      } else {
        fetchVehicleList();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add vehicle.");
    }
  };

  const updateVehicle = async (updatedVehicle) => {
    try {
      const res = await updateVehicleApi(updatedVehicle._id, updatedVehicle);
      if (res.data && res.data.vehicle) {
        setVehicles((prev) =>
          prev.map((v) => (v._id === updatedVehicle._id ? res.data.vehicle : v))
        );
      } else {
        fetchVehicleList();
      }
      setEditingVehicle(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update vehicle.");
    }
  };

  const deleteVehicle = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle from MongoDB?"
    );
    if (!confirmDelete) return;

    try {
      await deleteVehicleApi(id);
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      alert("Failed to delete vehicle.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Vehicles</h1>
          <p className="text-slate-400">Manage all fleet vehicles dynamically</p>
        </div>

        <button
          onClick={() => {
            setEditingVehicle(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FaPlus />
          Add Vehicle
        </button>
      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="relative w-96">
          <FaSearch className="absolute top-4 left-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search Vehicle No or Driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 rounded-xl pl-12 pr-4 py-3 outline-none text-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="text-left p-4">Vehicle No</th>
              <th className="text-left">Driver</th>
              <th className="text-left">Speed</th>
              <th className="text-left">Fuel</th>
              <th className="text-left">Status</th>
              <th className="text-left">Location</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-slate-400">
                  Fetching vehicles from MongoDB...
                </td>
              </tr>
            ) : filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-slate-400">
                  No vehicles found.
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle._id || vehicle.vehicleNo}
                  className="border-t border-slate-800 hover:bg-slate-800 text-white"
                >
                  <td className="p-4 font-semibold">{vehicle.vehicleNo}</td>
                  <td>{vehicle.driver || "Unassigned"}</td>
                  <td>{vehicle.speed ?? 0} km/h</td>
                  <td>{vehicle.fuel ?? 100}%</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        vehicle.status === "Online" || vehicle.status === "Moving"
                          ? "bg-emerald-600/30 text-emerald-400 border border-emerald-500/30"
                          : "bg-red-600/30 text-red-400 border border-red-500/30"
                      }`}
                    className={`px-3 py-1 rounded-full text-sm ${
                        vehicle.status === "Online"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="text-slate-300 text-sm">{vehicle.location || "Dynamic GPS"}</td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white"
                        title="View"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => {
                          setEditingVehicle(vehicle);
                          setShowModal(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg text-slate-900"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => deleteVehicle(vehicle._id)}
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>

                        <button
                          onClick={() => setSelectedVehicle(vehicle)}
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                          title="View">


                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                          title="View">
                            
                          <FaEye />
                        </button>

                        <button
                            onClick={() => {
                              setEditingVehicle(vehicle);
                              setShowModal(true);
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg"
                            title="Edit">
                            <FaEdit />
                        </button>

                        <button
                          onClick={() => deleteVehicle(vehicle.id)}
                          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                          title="Delete">
                          <FaTrash />
                        </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddVehicleModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingVehicle(null);
        }}
        onSave={editingVehicle ? updateVehicle : addVehicle}
        editingVehicle={editingVehicle}
      />

      <ViewVehicleModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </div>
  );
}

export default Vehicles;