import {FaPlus,FaSearch,FaEye,FaEdit,FaTrash,} from "react-icons/fa";
import { useState } from "react";
import AddVehicleModal from "../components/Modals/AddVehicleModal";
import ViewVehicleModal from "../components/Modals/ViewVehicleModal";
import initialVehicles from "../data/vehicles";


function Vehicles() {

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleNo.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(search.toLowerCase())
    );

    const addVehicle = (vehicle) => {
        const newVehicle = {
            id: Date.now(),
            speed: 0,
            location: "Not Assigned",
            ...vehicle,
        };
        setVehicles((prev) => [...prev, newVehicle]);
    };

    const updateVehicle = (updatedVehicle) => {
      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id === updatedVehicle.id
            ? updatedVehicle
            : vehicle
        )
      );
      setEditingVehicle(null);
    };

    const deleteVehicle = (id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this vehicle?"
      );
      if (!confirmDelete) return;
      setVehicles((prev) =>
        prev.filter((vehicle) => vehicle.id !== id)
      );
    };

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Vehicles
          </h1>

          <p className="text-slate-400">
            Manage all fleet vehicles
          </p>
        </div>

        <button
          onClick={() => {
            setEditingVehicle(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2">
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
            placeholder="Search Vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 rounded-xl pl-12 pr-4 py-3 outline-none text-white"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

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

            

            {filteredVehicles.map((vehicle) => (

                <tr
                key={vehicle.id}
                className="border-t border-slate-800 hover:bg-slate-800"
                >

                <td className="p-4">{vehicle.vehicleNo}</td>

                <td>{vehicle.driver}</td>

                <td>{vehicle.speed} km/h</td>

                <td>{vehicle.fuel}%</td>

                <td>

                    <span
                    className={`px-3 py-1 rounded-full text-sm ${
                        vehicle.status === "Online"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                    >
                    {vehicle.status}
                    </span>

                </td>

                <td>{vehicle.location}</td>

                <td>
                    <div className="flex gap-3">

                        <button
                          onClick={() => setSelectedVehicle(vehicle)}
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

            ))}

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