import { useState, useEffect } from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaBell,
  FaShieldAlt,
} from "react-icons/fa";
import { getAlerts, resolveAlertApi } from "../services/api";
import socket from "../services/socket";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlertsList = async () => {
    try {
      setLoading(true);

      const res = await getAlerts();

      if (res.data && res.data.alerts) {
        setAlerts(res.data.alerts);
      }
    } catch (err) {
      console.error("Error fetching alerts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlertsList();
  }, []);

  // Real-time listener for Socket.IO vehicle-alert event
  useEffect(() => {
    const handleVehicleAlert = (newAlert) => {
      if (newAlert.alerts && newAlert.alerts.length > 0) {
        newAlert.alerts.forEach((msg) => {
          const item = {
            _id: Date.now() + Math.random(),
            vehicleId: newAlert.vehicleId,
            driver: newAlert.driver || "Fleet Driver",
            alertType: msg.split(":")[0] || "Warning",
            message: msg,
            severity:
              msg.includes("Overspeed") || msg.includes("Exit")
                ? "Critical"
                : "Warning",
            status: "Active",
            timestamp: new Date(),
          };

          setAlerts((prev) => [item, ...prev]);
        });
      }
    };

    socket.on("vehicle-alert", handleVehicleAlert);

    return () => {
      socket.off("vehicle-alert", handleVehicleAlert);
    };
  }, []);

  const handleResolveAlert = async (id) => {
    try {
      await resolveAlertApi(id);

      setAlerts((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: "Resolved" } : a
        )
      );
    } catch (err) {
      console.error("Error resolving alert:", err);

      // Local optimistic update fallback
      setAlerts((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: "Resolved" } : a
        )
      );
    }
  };

  const activeCount = alerts.filter(
    (a) => a.status === "Active"
  ).length;

  const criticalCount = alerts.filter(
    (a) => a.severity === "Critical" && a.status === "Active"
  ).length;

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FaBell className="text-amber-500" />
            Fleet Alerts & Geofence Breaches
          </h1>

          <p className="text-slate-400 mt-1">
            Real-time worker thread & database notification stream
          </p>
        </div>

        <div className="flex gap-4">

          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-center">
            <span className="text-xs text-slate-400 block">
              Active Alerts
            </span>

            <strong className="text-xl text-amber-400">
              {activeCount}
            </strong>
          </div>

          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-center">
            <span className="text-xs text-slate-400 block">
              Critical Breaches
            </span>

            <strong className="text-xl text-red-500">
              {criticalCount}
            </strong>
          </div>

        </div>
      </div>

      {/* Alerts Stream List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">

        {loading ? (
          <div className="p-8 text-center text-slate-400">
            Loading live alerts...
          </div>
        ) : alerts.length === 0 ? (

          <div className="p-12 text-center text-slate-400 space-y-2">

            <FaShieldAlt
              size={48}
              className="mx-auto text-emerald-500 opacity-60"
            />

            <h3 className="text-lg font-bold text-white">
              All Systems Operational
            </h3>

            <p className="text-sm">
              No active threshold or geofence alerts registered.
            </p>

          </div>

        ) : (

          alerts.map((alert) => (

            <div
              key={alert._id}
              className={`border rounded-xl p-5 flex items-center justify-between transition-all ${
                alert.status === "Resolved"
                  ? "bg-slate-950/60 border-slate-800/80 opacity-60"
                  : alert.severity === "Critical"
                  ? "bg-red-950/30 border-red-800/50 shadow-md shadow-red-950/20"
                  : "bg-amber-950/20 border-amber-800/40"
              }`}
            >

              <div className="flex items-start gap-4">

                <div
                  className={`p-3 rounded-xl ${
                    alert.severity === "Critical"
                      ? "bg-red-600/20 text-red-500"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  <FaExclamationTriangle size={24} />
                </div>

                <div className="space-y-1">

                  <div className="flex items-center gap-3">

                    <h3 className="text-white font-bold text-base">
                      {alert.vehicleId} — {alert.alertType}
                    </h3>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        alert.severity === "Critical"
                          ? "bg-red-600/30 text-red-400 border border-red-500/40"
                          : "bg-amber-500/30 text-amber-400 border border-amber-500/40"
                      }`}
                    >
                      {alert.severity}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        alert.status === "Resolved"
                          ? "bg-emerald-600/20 text-emerald-400"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {alert.status}
                    </span>

                  </div>

                  <p className="text-slate-300 text-sm">
                    {alert.message}
                  </p>

                  <p className="text-xs text-slate-500">
                    Driver: {alert.driver || "Fleet Driver"} • Timestamp:{" "}
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>

                </div>

              </div>

              {alert.status === "Active" && (
                <button
                  onClick={() => handleResolveAlert(alert._id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaCheckCircle />
                  Resolve Alert
                </button>
              )}

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Alerts;