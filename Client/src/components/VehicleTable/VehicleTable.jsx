const vehicles = [
  {
    id: 1,
    number: "GJ05AB1234",
    driver: "SP",
    status: "Online",
    speed: "72 km/h",
    fuel: "80%",
    location: "Surat",
  },
  {
    id: 2,
    number: "MH12XY5678",
    driver: "Kamlesh",
    status: "Offline",
    speed: "0 km/h",
    fuel: "45%",
    location: "Mumbai",
  },
  {
    id: 3,
    number: "RJ14AA1122",
    driver: "Dev",
    status: "Online",
    speed: "65 km/h",
    fuel: "67%",
    location: "Jaipur",
  },
  {
    id: 4,
    number: "DL01BB3344",
    driver: "Hiteshs",
    status: "Online",
    speed: "80 km/h",
    fuel: "92%",
    location: "Delhi",
  },
];

function VehicleTable() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">
          Recent Vehicles
        </h2>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="border-b border-slate-700">

            <tr className="text-slate-400">
              <th className="py-3">Vehicle</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Speed</th>
              <th>Fuel</th>
              <th>Location</th>
            </tr>

          </thead>

          <tbody>

            {vehicles.map((vehicle) => (

              <tr
                key={vehicle.id}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >

                <td className="py-4 text-white">
                  {vehicle.number}
                </td>

                <td className="text-slate-300">
                  {vehicle.driver}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      vehicle.status === "Online"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </td>

                <td className="text-white">
                  {vehicle.speed}
                </td>

                <td className="text-white">
                  {vehicle.fuel}
                </td>

                <td className="text-slate-300">
                  {vehicle.location}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}

export default VehicleTable;