import { useState } from "react";
import {FaPlus,FaSearch,FaEye,FaEdit,FaTrash,} from "react-icons/fa";
import AddTripModal from "../components/Modals/AddTripModal";
import ViewTripModal from "../components/Modals/ViewTripModal";
import initialTrips from "../data/trips";

function Trips() {

  const [search, setSearch] = useState("");
  const [trips, setTrips] = useState(initialTrips);
  const [showModal, setShowModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const filteredTrips = trips.filter(
    (trip) =>
      trip.tripId.toLowerCase().includes(search.toLowerCase()) ||
      trip.driver.toLowerCase().includes(search.toLowerCase()) ||
      trip.vehicle.toLowerCase().includes(search.toLowerCase())
  );

    const addTrip = (trip) => {
    const newTrip = {
      id: Date.now(),
      ...trip,
    };
    setTrips([...trips, newTrip]);
  };

  const updateTrip = (updatedTrip) => {
    setTrips(
      trips.map((trip) =>
        trip.id === updatedTrip.id ? updatedTrip : trip
      )
    );
    setEditingTrip(null);
  };

  const deleteTrip = (id) => {
    if (!window.confirm("Delete this trip?")) return;

    setTrips(trips.filter((trip) => trip.id !== id));
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Trips
          </h1>

          <p className="text-slate-400">
            Manage all fleet trips
          </p>
        </div>

        <button
          onClick={() => {
            setEditingTrip(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2">
          <FaPlus />
          Add Trip
        </button>

      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">

        <div className="relative w-96">

          <FaSearch className="absolute top-4 left-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search Trip..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 rounded-xl pl-12 pr-4 py-3 outline-none text-white"
          />

        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4">Trip ID</th>
              <th className="text-left">Vehicle</th>
              <th className="text-left">Driver</th>
              <th className="text-left">Source</th>
              <th className="text-left">Destination</th>
              <th className="text-left">Start</th>
              <th className="text-left">End</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredTrips.map((trip) => (

              <tr
                key={trip.id}
                className="border-t border-slate-800 hover:bg-slate-800"
              >

                <td className="p-4">{trip.tripId}</td>

                <td>{trip.vehicle}</td>

                <td>{trip.driver}</td>

                <td>{trip.source}</td>

                <td>{trip.destination}</td>

                <td>{trip.startTime}</td>

                <td>{trip.endTime}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      trip.status === "Running"
                        ? "bg-green-600"
                        : trip.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-blue-600"
                    }`}
                  >
                    {trip.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-3">

                    <button
                      onClick={() => setSelectedTrip(trip)}
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg">
                      <FaEye />
                    </button>

                    <button
                      onClick={() => {
                        setEditingTrip(trip);
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg">
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg">
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <AddTripModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingTrip(null);
        }}
        onSave={editingTrip ? updateTrip : addTrip}
        editingTrip={editingTrip}
      />

      <ViewTripModal
        trip={selectedTrip}
        onClose={() => setSelectedTrip(null)}
      />

    </div>
  );
}

export default Trips;