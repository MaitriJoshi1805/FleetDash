function Drivers() {
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

          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
            + Add Driver
          </button>

        </div>

        <table className="w-full">

          <thead>

            <tr className="text-slate-400 border-b border-slate-700">

              <th className="text-left py-3">Driver</th>

              <th className="text-left">Phone</th>

              <th className="text-left">Vehicle</th>

              <th className="text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b border-slate-800">

              <td className="py-4">SP</td>

              <td>9876543210</td>

              <td>GJ05AB1234</td>

              <td>
                <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                  Driving
                </span>
              </td>

            </tr>

            <tr>

              <td className="py-4">Kamlesh</td>

              <td>9123456789</td>

              <td>GJ05XY5678</td>

              <td>
                <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                  Rest
                </span>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Drivers;