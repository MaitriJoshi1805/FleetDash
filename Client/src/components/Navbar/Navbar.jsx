import { useState } from "react";
import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Overspeed Alert",
      message: "TRUCK-104 exceeded 80 km/h",
      time: "Recently",
      type: "Critical",
    },
    {
      id: 2,
      title: "Low Fuel Alert",
      message: "Vehicle GJ05XY5678 has low fuel",
      time: "15 min ago",
      type: "Warning",
    },
    {
      id: 3,
      title: "Geofence Alert",
      message: "Vehicle exited the assigned geofence",
      time: "25 min ago",
      type: "Warning",
    },
  ];

  const handleNotificationClick = () => {
    console.log("BELL CLICKED");
    setShowNotifications((prev) => !prev);
  };

  const handleViewAllAlerts = () => {
    window.location.href = "/alerts";
  };

  return (
    <header
      className={`h-20 px-8 flex items-center justify-between border-b relative z-[1000] ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    >
      {/* LEFT SIDE */}
      <div>
        <h1
          className={`text-3xl font-bold ${
            theme === "dark"
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          Fleet Dashboard
        </h1>

        <p
          className={`text-sm ${
            theme === "dark"
              ? "text-slate-400"
              : "text-gray-600"
          }`}
        >
          Monitor all fleet vehicles in real time
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">

        {/* SEARCH */}
        <div
          className={`flex items-center rounded-xl px-4 py-2 ${
            theme === "dark"
              ? "bg-slate-800"
              : "bg-gray-100 border border-gray-300"
          }`}
        >
          <FaSearch className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className={`ml-2 bg-transparent outline-none ${
              theme === "dark"
                ? "text-white placeholder:text-slate-500"
                : "text-gray-900 placeholder:text-gray-500"
            }`}
          />
        </div>

        {/* ================= NOTIFICATION ================= */}
        <div className="relative z-[9999]">

          <button
            type="button"
            onClick={handleNotificationClick}
            className={`relative z-[9999] p-3 rounded-xl cursor-pointer transition ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            aria-label="Notifications"
          >
            <FaBell
              className={`text-lg pointer-events-none ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-800"
              }`}
            />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center pointer-events-none">
              {notifications.length}
            </span>
          </button>

          {/* DROPDOWN */}
          {showNotifications && (
            <div
              className={`absolute right-0 top-14 w-96 rounded-xl shadow-2xl border overflow-hidden z-[10000] ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-gray-300"
              }`}
            >

              {/* HEADER */}
              <div
                className={`flex items-center justify-between px-4 py-3 border-b ${
                  theme === "dark"
                    ? "border-slate-700"
                    : "border-gray-200"
                }`}
              >
                <h3
                  className={`font-bold ${
                    theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  Notifications
                </h3>

                <span className="text-xs text-slate-400">
                  {notifications.length} alerts
                </span>
              </div>

              {/* NOTIFICATION LIST */}
              <div className="max-h-80 overflow-y-auto">

                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={handleViewAllAlerts}
                    className={`px-4 py-4 border-b cursor-pointer transition ${
                      theme === "dark"
                        ? "border-slate-800 hover:bg-slate-800"
                        : "border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex gap-3">

                      <div
                        className={`p-2 rounded-lg ${
                          notification.type === "Critical"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-amber-500/20 text-amber-500"
                        }`}
                      >
                        <FaExclamationTriangle />
                      </div>

                      <div className="flex-1">

                        <p
                          className={`font-semibold text-sm ${
                            theme === "dark"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {notification.title}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {notification.message}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {notification.time}
                        </p>

                      </div>

                    </div>
                  </div>
                ))}

              </div>

              {/* VIEW ALL */}
              <button
                type="button"
                onClick={handleViewAllAlerts}
                className="w-full py-3 text-sm font-semibold text-blue-500 hover:bg-slate-800"
              >
                View All Alerts
              </button>

            </div>
          )}

        </div>

        {/* THEME */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`p-3 rounded-xl transition ${
            theme === "dark"
              ? "bg-slate-800 hover:bg-slate-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* USER */}
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-xl ${
            theme === "dark"
              ? "bg-slate-800"
              : "bg-gray-100 border border-gray-300"
          }`}
        >
          <MdAccountCircle
            size={42}
            className="text-blue-500"
          />

          <div>
            <h3
              className={`font-semibold ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              Admin
            </h3>

            <p className="text-xs text-slate-400">
              Fleet Manager
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;