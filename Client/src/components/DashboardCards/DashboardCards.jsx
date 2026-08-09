import { useEffect, useState } from "react";
import {
  FaTruckMoving,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { getDashboardStatsApi } from "../../services/api";
import socket from "../../services/socket";

function DashboardCards({ statsData }) {
  const [metrics, setMetrics] = useState({
    totalVehicles: 0,
    onlineVehicles: 0,
    offlineVehicles: 0,
    activeAlerts: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await getDashboardStatsApi();
      if (res.data && res.data.stats) {
        setMetrics(res.data.stats);
      }
    } catch (err) {
      console.error("Error fetching dashboard cards stats:", err);
    }
  };

  useEffect(() => {
    if (statsData) {
      setMetrics(statsData);
    } else {
      fetchStats();
    }
  }, [statsData]);

  useEffect(() => {
    const handleSocketUpdate = () => {
      fetchStats();
    };

    socket.on("vehicle-location", handleSocketUpdate);
    socket.on("vehicle-alert", handleSocketUpdate);

    return () => {
      socket.off("vehicle-location", handleSocketUpdate);
      socket.off("vehicle-alert", handleSocketUpdate);
    };
  }, []);

  const cards = [
    {
      title: "Total Vehicles",
      value: metrics.totalVehicles ?? 0,
      change: "Active Fleet",
      icon: <FaTruckMoving size={28} />,
      bg: "bg-blue-600",
    },
    {
      title: "Online / Moving",
      value: metrics.onlineVehicles ?? 0,
      change: "Live Telemetry",
      icon: <FaCheckCircle size={28} />,
      bg: "bg-emerald-600",
    },
    {
      title: "Offline / Stopped",
      value: metrics.offlineVehicles ?? 0,
      change: "Stationary",
      icon: <FaTimesCircle size={28} />,
      bg: "bg-red-600",
    },
    {
      title: "Active Alerts",
      value: metrics.activeAlerts ?? 0,
      change: "Action Required",
      icon: <FaExclamationTriangle size={28} />,
      bg: "bg-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-6 hover:scale-105 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">{item.title}</p>

              <h2 className="text-3xl font-bold text-white mt-2">
                {item.value}
              </h2>

              <p className="text-emerald-400 text-sm mt-2 font-medium">
                ● {item.change}
              </p>
            </div>

            <div className={`${item.bg} p-4 rounded-xl text-white shadow-md`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;