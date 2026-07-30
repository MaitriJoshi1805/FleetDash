import { useState } from "react";
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
<<<<<<< HEAD
=======

>>>>>>> c61b146 (Updated vehicle, driver and trip pages)
import initialDrivers from "../data/drivers";
import AddDriverModal from "../components/Modals/AddDriverModal";
import ViewDriverModal from "../components/Modals/ViewDriverModal";

function Drivers() {

  const [search, setSearch] = useState("");
  const [drivers, setDrivers] = useState(initialDrivers);
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(search.toLowerCase()) ||
      driver.vehicle.toLowerCase().includes(search.toLowerCase())
  );

<<<<<<< HEAD
  const addDriver = (driver) => {
    const newDriver = {
      id: Date.now(),
      ...driver,
    };

    setDrivers((prev) => [...prev, newDriver]);
  };

  const updateDriver = (updatedDriver) => {
    setDrivers((prev) =>
      prev.map((driver) =>
=======

  const addDriver = (driver) => {
    setDrivers([
      ...drivers,
      {
        id: Date.now(),
        ...driver,
      },
    ]);
  };

  const updateDriver = (updatedDriver) => {
    setDrivers(
      drivers.map((driver) =>
>>>>>>> c61b146 (Updated vehicle, driver and trip pages)
        driver.id === updatedDriver.id
          ? updatedDriver
          : driver
      )
    );
<<<<<<< HEAD

=======
>>>>>>> c61b146 (Updated vehicle, driver and trip pages)
    setEditingDriver(null);
  };

  const deleteDriver = (id) => {
<<<<<<< HEAD
    const confirmDelete = window.confirm(
      "Delete this driver?"
    );

    if (!confirmDelete) return;

    setDrivers((prev) =>
      prev.filter((driver) => driver.id !== id)
    );
=======
    if (!window.confirm("Delete this driver?")) return;
    setDrivers(drivers.filter((driver) => driver.id !== id));
>>>>>>> c61b146 (Updated vehicle, driver and trip pages)
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Drivers
        </h1>

        <p className="text-slate-400">
          Manage all fleet drivers
        </p>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-semibold">
            Driver List
          </h2>

          <button
            onClick={() => {
              setEditingDriver(null);
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
            + Add Driver
          </button>
        </div>

        <div className="mb-6">
          <div className="relative w-96">

            <FaSearch className="absolute top-4 left-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search Driver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 rounded-xl pl-12 pr-4 py-3 outline-none text-white"
            />

          </div>
        </div>

        <div className="mb-6">
          <div className="relative w-96">

            <FaSearch className="absolute top-4 left-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search Driver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 rounded-xl pl-12 pr-4 py-3 outline-none text-white"
            />

          </div>
        </div>

        <table className="w-full">

          <thead>
            <tr className="text-slate-400 border-b border-slate-700">

              <th className="text-left py-3">Driver</th>

              <th className="text-left">Phone</th>

              <th className="text-left">Vehicle</th>

              <th className="text-left">Status</th>

              <th className="text-left">Actions</th>
<<<<<<< HEAD

            </tr>
=======
>>>>>>> c61b146 (Updated vehicle, driver and trip pages)

            </tr>
          </thead>

          <tbody>

            {filteredDrivers.map((driver) => (

              <tr
                key={driver.id}
<<<<<<< HEAD
                className="border-b border-slate-800 hover:bg-slate-800">

                <td className="py-4">
                  {driver.name}
                </td>

                <td>
                  {driver.phone}
                </td>

                <td>
                  {driver.vehicle}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      driver.status === "Active"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}>
                    {driver.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-3">

                    <button
                      onClick={() => setSelectedDriver(driver)}
                      className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700">
                      <FaEye />
                    </button>

                    <button
                      onClick={() => {
                        setEditingDriver(driver);
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg">
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteDriver(driver.id)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg">
                      <FaTrash />
                    </button>

=======
                className="border-b border-slate-800 hover:bg-slate-800"
              >

                <td className="py-4">{driver.name}</td>

                <td>{driver.phone}</td>

                <td>{driver.vehicle}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      driver.status === "Active"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {driver.status}
                  </span>
                </td>

                <td>

                  <div className="flex gap-3">

                    <button
                      onClick={() => setSelectedDriver(driver)}
                      className="bg-blue-600 p-2 rounded-lg"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => {
                        setEditingDriver(driver);
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 p-2 rounded-lg"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteDriver(driver.id)}
                      className="bg-red-600 p-2 rounded-lg"
                    >
                      <FaTrash />
                    </button>

>>>>>>> c61b146 (Updated vehicle, driver and trip pages)
                  </div>

                </td>

              </tr>

            ))}

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