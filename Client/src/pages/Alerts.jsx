import { useState } from "react";
import {FaSearch,FaEye,FaTrash,} from "react-icons/fa";
import ViewAlertModal from "../components/Modals/ViewAlertModal";
import initialAlerts from "../data/alerts";

function Alerts() {

  const [search, setSearch] = useState("");
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null);


  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      alert.type.toLowerCase().includes(search.toLowerCase())
  );

  const deleteAlert = (id) => {
    if (!window.confirm("Delete this alert?")) return;

    setAlerts(alerts.filter((alert) => alert.id !== id));
  };


  return (
    
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Alerts
        </h1>

        <p className="text-slate-400">
          Monitor vehicle alerts
        </p>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

        <div className="relative w-96">

          <FaSearch className="absolute top-4 left-4 text-slate-400"/>

          <input
            type="text"
            placeholder="Search Alert..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full bg-slate-800 rounded-xl pl-12 pr-4 py-3 outline-none text-white"
          />

        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4">Type</th>
              <th className="text-left">Vehicle</th>
              <th className="text-left">Message</th>
              <th className="text-left">Time</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredAlerts.map((alert) => (

              <tr
                key={alert.id}
                className="border-t border-slate-800 hover:bg-slate-800"
              >

                <td className="p-4">{alert.type}</td>

                <td>{alert.vehicle}</td>

                <td>{alert.message}</td>

                <td>{alert.time}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      alert.status === "Unread"
                        ? "bg-red-600"
                        : "bg-green-600"
                    }`}
                  >
                    {alert.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-3">

                    <button
                      onClick={() => setSelectedAlert(alert)}
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <ViewAlertModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />

    </div>
  );
}

export default Alerts;