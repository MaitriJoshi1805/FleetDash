import { useState, useEffect } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddDriverModal from "../components/Modals/AddDriverModal";
import ViewDriverModal from "../components/Modals/ViewDriverModal";
import { getDrivers, createDriverApi, updateDriverApi, deleteDriverApi } from "../services/api";

function Drivers() {
  const [search, setSearch] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDriverList = async () => {
    try {
      setLoading(true);
      const res = await getDrivers();
      if (res.data && res.data.drivers) {
        setDrivers(res.data.drivers);
      }
    } catch (err) {
      console.error("Error fetching drivers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriverList();
  }, []);

  const filteredDrivers = drivers.filter(
    (driver) =>
      (driver.name && driver.name.toLowerCase().includes(search.toLowerCase())) ||
      (driver.vehicle && driver.vehicle.toLowerCase().includes(search.toLowerCase()))
  );

  const addDriver = async (driverData) => {
    try {
      const res = await createDriverApi(driverData);
      if (res.data && res.data.driver) {
        setDrivers((prev) => [res.data.driver, ...prev]);
      } else {
        fetchDriverList();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add driver.");
    }
  };

  const updateDriver = async (updatedDriver) => {
    try {
      const res = await updateDriverApi(updatedDriver._id, updatedDriver);
      if (res.data && res.data.driver) {
        setDrivers((prev) =>
          prev.map((d) => (d._id === updatedDriver._id ? res.data.driver : d))
        );
      } else {
        fetchDriverList();
      }
      setEditingDriver(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update driver.");
    }
  };

  const deleteDriver = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this driver?");
    if (!confirmDelete) return;

    try {
      await deleteDriverApi(id);
      setDrivers((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      alert("Failed to delete driver.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Drivers</h1>
          <p className="text-slate-400">Manage all fleet drivers dynamically</p>
        </div>

        <button
          onClick={() => {
            setEditingDriver(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium"
        >
          <FaPlus /> Add Driver
        </button>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-lg">
        <div className="mb-6">
          <div className="relative w-96">
            <FaSearch className="absolute top-4 left-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search Driver Name or Vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 rounded-xl pl-12 pr-4 py-3 outline-none text-white"
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="text-left py-3">Driver Name</th>
              <th className="text-left">Phone</th>
              <th className="text-left">License</th>
              <th className="text-left">Assigned Vehicle</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-slate-400">
                  Loading drivers from MongoDB...
                </td>
              </tr>
            ) : filteredDrivers.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-slate-400">
                  No drivers found.
                </td>
              </tr>
            ) : (
              filteredDrivers.map((driver) => (
                <tr
                  key={driver._id || driver.name}
                  className="border-b border-slate-800 hover:bg-slate-800 text-white"
                >
                  <td className="py-4 font-semibold">{driver.name}</td>
                  <td>{driver.phone}</td>
                  <td className="text-slate-300">{driver.license}</td>
                  <td>{driver.vehicle || "Unassigned"}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        driver.status === "Active"
                          ? "bg-emerald-600/30 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-600/30 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedDriver(driver)}
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => {
                          setEditingDriver(driver);
                          setShowModal(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg text-slate-900"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => deleteDriver(driver._id)}
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

      <AddDriverModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingDriver(null);
        }}
        onSave={editingDriver ? updateDriver : addDriver}
        editingDriver={editingDriver}
      />

      <ViewDriverModal
        driver={selectedDriver}
        onClose={() => setSelectedDriver(null)}
      />
    </div>
  );
}

export default Drivers;