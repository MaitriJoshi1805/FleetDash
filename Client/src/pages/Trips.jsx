import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import AddTripModal from "../components/Modals/AddTripModal";
import ViewTripModal from "../components/Modals/ViewTripModal";
import { getTrips, createTripApi, updateTripApi, deleteTripApi } from "../services/api";

function Trips() {
  const [search, setSearch] = useState("");
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTripList = async () => {
    try {
      setLoading(true);
      const res = await getTrips();
      if (res.data && res.data.trips) {
        setTrips(res.data.trips);
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTripList();
  }, []);

  const filteredTrips = trips.filter(
    (trip) =>
      (trip.tripId && trip.tripId.toLowerCase().includes(search.toLowerCase())) ||
      (trip.driver && trip.driver.toLowerCase().includes(search.toLowerCase())) ||
      (trip.vehicle && trip.vehicle.toLowerCase().includes(search.toLowerCase()))
  );

  const addTrip = async (tripData) => {
    try {
      const res = await createTripApi(tripData);
      if (res.data && res.data.trip) {
        setTrips((prev) => [res.data.trip, ...prev]);
      } else {
        fetchTripList();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add trip.");
    }
  };

  const updateTrip = async (updatedTrip) => {
    try {
      const res = await updateTripApi(updatedTrip._id, updatedTrip);
      if (res.data && res.data.trip) {
        setTrips((prev) =>
          prev.map((t) => (t._id === updatedTrip._id ? res.data.trip : t))
        );
      } else {
        fetchTripList();
      }
      setEditingTrip(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update trip.");
    }
  };

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip from MongoDB?")) return;

    try {
      await deleteTripApi(id);
      setTrips((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete trip.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Trips</h1>
          <p className="text-slate-400">Manage all fleet trips dynamically</p>
        </div>

        <button
          onClick={() => {
            setEditingTrip(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FaPlus /> Add Trip
        </button>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-lg">
        <div className="relative w-96">
          <FaSearch className="absolute top-4 left-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search Trip ID, Driver, or Vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 rounded-xl pl-12 pr-4 py-3 outline-none text-white"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="text-left p-4">Trip ID</th>
              <th className="text-left">Vehicle</th>
              <th className="text-left">Driver</th>
              <th className="text-left">Source</th>
              <th className="text-left">Destination</th>
              <th className="text-left">Start Time</th>
              <th className="text-left">End Time</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="p-8 text-center text-slate-400">
                  Loading trips from MongoDB...
                </td>
              </tr>
            ) : filteredTrips.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-8 text-center text-slate-400">
                  No trips found.
                </td>
              </tr>
            ) : (
              filteredTrips.map((trip) => (
                <tr
                  key={trip._id || trip.tripId}
                  className="border-t border-slate-800 hover:bg-slate-800 text-white"
                >
                  <td className="p-4 font-semibold">{trip.tripId}</td>
                  <td>{trip.vehicle}</td>
                  <td>{trip.driver}</td>
                  <td className="text-slate-300">{trip.source}</td>
                  <td className="text-slate-300">{trip.destination}</td>
                  <td className="text-xs text-slate-400">{trip.startTime}</td>
                  <td className="text-xs text-slate-400">{trip.endTime}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        trip.status === "Running"
                          ? "bg-emerald-600/30 text-emerald-400 border border-emerald-500/30"
                          : trip.status === "Pending"
                          ? "bg-amber-500/30 text-amber-400 border border-amber-500/30"
                          : "bg-blue-600/30 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedTrip(trip)}
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => {
                          setEditingTrip(trip);
                          setShowModal(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg text-slate-900"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => deleteTrip(trip._id)}
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white"
                      >
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